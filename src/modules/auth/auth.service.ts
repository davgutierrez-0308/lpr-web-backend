import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { hash, verify } from "./crypto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private accessTtl(): number {
    return Number(this.config.get("JWT_ACCESS_TTL") ?? 900);
  }

  private refreshTtl(): number {
    return Number(this.config.get("JWT_REFRESH_TTL") ?? 604800);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.enabled) throw new UnauthorizedException("Invalid credentials");

    const ok = await verify(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const accessToken = await this.jwt.signAsync(
      { email: user.email, role: user.role },
      { secret: this.config.getOrThrow("JWT_ACCESS_SECRET"), subject: user.id, expiresIn: this.accessTtl() },
    );

    const refreshToken = await this.jwt.signAsync(
      { email: user.email, role: user.role },
      { secret: this.config.getOrThrow("JWT_REFRESH_SECRET"), subject: user.id, expiresIn: this.refreshTtl() },
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await hash(refreshToken) },
    });

    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.refreshTokenHash) throw new UnauthorizedException("No refresh stored");

    const ok = await verify(refreshToken, user.refreshTokenHash);
    if (!ok) throw new UnauthorizedException("Invalid refresh token");

    const accessToken = await this.jwt.signAsync(
      { email: user.email, role: user.role },
      { secret: this.config.getOrThrow("JWT_ACCESS_SECRET"), subject: user.id, expiresIn: this.accessTtl() },
    );

    return { accessToken };
  }

  async logout(userId: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: null } });
    return { ok: true };
  }
}
