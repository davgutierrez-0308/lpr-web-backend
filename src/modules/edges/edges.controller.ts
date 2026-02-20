import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { EdgesService } from "./edges.service";
import { CreateEdgeDto } from "./dto/create-edge.dto";
import { UpdateEdgeDto } from "./dto/update-edge.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../../common/security/roles.guard";
import { Roles } from "../../common/security/roles.decorator";
import { Role } from "@prisma/client";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("edges")
export class EdgesController {
  constructor(private readonly edgesService: EdgesService) {}

  @Get()
  findAll() {
    return this.edgesService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateEdgeDto) {
    return this.edgesService.create(dto);
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  update(@Param("id") id: string, @Body() dto: UpdateEdgeDto) {
    return this.edgesService.update(id, dto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  remove(@Param("id") id: string) {
    return this.edgesService.remove(id);
  }
}