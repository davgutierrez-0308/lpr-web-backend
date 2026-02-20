import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { LoginDto, RefreshDto } from "./dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService, private jwt: JwtService, private config: ConfigService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post("refresh")
  async refresh(@Body() dto: RefreshDto) {
    // Validamos refresh token con JWT_REFRESH_SECRET y extraemos sub
    const payload = await this.jwt.verifyAsync(dto.refreshToken, {
      secret: this.config.getOrThrow("JWT_REFRESH_SECRET"),
    });
    return this.auth.refresh(payload.sub, dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Req() req: any) {
    return this.auth.logout(req.user.id);
  }
}
