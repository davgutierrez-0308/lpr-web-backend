import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlertDto, userId?: string) {
    try {
      return await this.prisma.alertPlate.create({
        data: {
          plate: dto.plate.toUpperCase(),
          type: dto.type,
          description: dto.description,
          createdById: userId,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new ConflictException(
          "Alert already exists for this plate and type",
        );
      }
      throw err;
    }
  }

  findAll() {
    return this.prisma.alertPlate.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  findOne(id: string) {
    return this.prisma.alertPlate.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateAlertDto) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException("Alert not found");
    }

    try {
      return await this.prisma.alertPlate.update({
        where: { id },
        data: {
          plate: dto.plate?.toUpperCase(),
          type: dto.type,
          description: dto.description,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new ConflictException(
          "Another alert already exists for this plate and type",
        );
      }
      throw err;
    }
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException("Alert not found");
    }

    return this.prisma.alertPlate.delete({
      where: { id },
    });
  }

  async toggle(id: string) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException("Alert not found");
    }

    return this.prisma.alertPlate.update({
      where: { id },
      data: {
        enabled: !existing.enabled,
      },
    });
  }
}
