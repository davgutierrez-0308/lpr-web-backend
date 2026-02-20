import { Body, Controller, Get, Patch, Param, Post, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../../common/security/roles.decorator";
import { RolesGuard } from "../../common/security/roles.guard";
import { UsersService } from "./users.service";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

class CreateUserDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
  @IsEnum(Role) role!: Role;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto.email, dto.password, dto.role);
  }

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.users.list();
  }

  @Roles(Role.ADMIN)
  @Patch(":id/disable")
  disable(@Param("id") id: string) {
    return this.users.disable(id);
  }
}
