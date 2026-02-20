import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { CreateEdgeDto } from "./dto/create-edge.dto";
import { UpdateEdgeDto } from "./dto/update-edge.dto";

@Injectable()
export class EdgesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEdgeDto) {
    return this.prisma.edgeNode.create({
      data: {
        name: dto.name,
        location: dto.location,
        status: dto.status ?? "DESCONOCIDO",
      },
    });
  }

  findAll() {
    return this.prisma.edgeNode.findMany({
      include: {
        cameras: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findOne(id: string) {
    return this.prisma.edgeNode.findUnique({
      where: { id },
      include: { cameras: true },
    });
  }

  async update(id: string, dto: UpdateEdgeDto) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException("Edge not found");

    return this.prisma.edgeNode.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException("Edge not found");

    return this.prisma.edgeNode.delete({
      where: { id },
    });
  }
}