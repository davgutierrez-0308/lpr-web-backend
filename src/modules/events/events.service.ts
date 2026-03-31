import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { RealtimeService } from "../realtime/realtime.service";
import { AlertType } from "@prisma/client";
import { SmsService } from "../events/sms.service";
import { EmailService } from "../events/email.service";

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService, 
    private rt: RealtimeService, 
    private sms: SmsService,
    private email: EmailService) {}

  async createEvent(input: {
    plate: string;
    confidence: number;
    cameraId: string;
    capturedAt?: Date;
    imageUrl?: string;
    raw?: any;
    vehicleUrl?: string;
  }) {
    // Eval alerta simple (placa exacta enabled)
    const alert = await this.prisma.alertPlate.findFirst({
      where: { plate: input.plate, enabled: true },
    });
    console.log(input);
    const event = await this.prisma.plateEvent.create({
      data: {
        plate: input.plate,
        confidence: input.confidence,
        cameraId: input.cameraId,
        capturedAt: input.capturedAt ?? new Date(),
        imageUrl: input.imageUrl,
        raw: input.raw,
        isAlert: !!alert,
        alertType: alert?.type ?? null,
        vehicleUrl: input.vehicleUrl
      },
    });
    this.rt.emit({ type: "plate_event", data: event });
    this.sms.sendSms("+51997406575", "Revisar alerta placa: " + input.plate);
    this.email.sendEmail(
        "dmguza@gmail.com", 
        "[Alerta] Veci-placa Alerta reportada",
        "Alerta reportada - Vehículo detectado: " + input.plate,
        "<h2>🚨 Alerta Sistema Veci-placa</h2><p>Vehículo detectado: <b>" + input.plate + "</b></p>"
      );
      
    return event;
  }

  async search(params: {
    plate?: string;
    cameraId?: string;
    from?: Date;
    to?: Date;
    minConfidence?: number;
    isAlert?: boolean;
    skip?: number;
    take?: number;
  }) {
    const take = Math.min(params.take ?? 50, 200);
    const skip = params.skip ?? 0;

    const where: any = {};
    if (params.plate) where.plate = { contains: params.plate, mode: "insensitive" };
    if (params.cameraId) where.cameraId = params.cameraId;
    if (params.minConfidence != null) where.confidence = { gte: params.minConfidence };
    if (params.isAlert != null) where.isAlert = params.isAlert;
    if (params.from || params.to) {
      where.capturedAt = {};
      if (params.from) where.capturedAt.gte = params.from;
      if (params.to) where.capturedAt.lte = params.to;
    }

    const [items, total] = await Promise.all([
      this.prisma.plateEvent.findMany({
        where,
        orderBy: { capturedAt: "desc" },
        skip,
        take,
      }),
      this.prisma.plateEvent.count({ where }),
    ]);

    return { items, total, skip, take };
  }

  async search2(query: any) {
    const {
      plate,
      cameraId,
      isAlert,
      from,
      to,
      page = "1",
      limit = "20",
    } = query;

    const where: any = {};

    if (plate) {
      where.plate = {
        contains: plate.toUpperCase(),
        mode: "insensitive",
      };
    }

    if (cameraId) {
      where.cameraId = cameraId;
    }

    if (isAlert !== undefined) {
      where.isAlert = isAlert === "true";
    }

    if (from || to) {
      where.capturedAt = {};
      if (from) {
        where.capturedAt.gte = new Date(from);
      }
      if (to) {
        where.capturedAt.lte = new Date(to);
      }
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await Promise.all([
      this.prisma.plateEvent.findMany({
        where,
        orderBy: { capturedAt: "desc" },
        skip,
        take: limitNumber,
      }),
      this.prisma.plateEvent.count({ where }),
    ]);
    console.log("Data: ", data);
    return {
      data,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  }

}
