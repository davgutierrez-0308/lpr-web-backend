import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { CreateCameraDto } from "./dto/create-camera.dto";
import { UpdateCameraDto } from "./dto/update-camera.dto";

@Injectable()
export class CamerasService {
  constructor(private prisma: PrismaService) {}
  /*
  create(dto: CreateCameraDto) {
    return this.prisma.camera.create({
      data: {
        name: dto.name,
        location: dto.location,
        rtspUrl: dto.rtspUrl,
        edgeNodeId: dto.edgeNodeId ?? null,
        status: dto.status ?? "DESCONOCIDO",
      },
    });
  }*/
  create(dto: CreateCameraDto) {
    return this.prisma.camera.create({
        data: {
        name: dto.name,
        location: dto.location,
        rtspUrl: dto.rtspUrl,
        status: dto.status ?? "DESCONOCIDO",
        edgeNodeId: dto.edgeNodeId ?? null,
        },
    });
    }

  findAll() {
    return this.prisma.camera.findMany({
      include: { edgeNode: true },
      orderBy: { createdAt: "desc" },
      // include: { edgeNode: true }, // habilita si tu schema tiene relación
    });
  }

  findOne(id: string) {
    return this.prisma.camera.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateCameraDto) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException("Camera not found");

    return this.prisma.camera.update({
      where: { id },
      data: {
        name: dto.name,
        location: dto.location,
        rtspUrl: dto.rtspUrl,
        edgeNodeId: dto.edgeNodeId ?? undefined,
        status: dto.status,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException("Camera not found");

    return this.prisma.camera.delete({ where: { id } });
  }
}