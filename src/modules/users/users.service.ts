import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { Role } from "@prisma/client";
import { hash } from "../auth/crypto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string, role: Role) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new BadRequestException("Email ya existe");
    return this.prisma.user.create({
      data: { email, passwordHash: await hash(password), role },
      select: { id: true, email: true, role: true, enabled: true, createdAt: true },
    });
  }

  list() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, enabled: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  disable(id: string) {
    return this.prisma.user.update({ where: { id }, data: { enabled: false } });
  }
}
