"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const realtime_service_1 = require("../realtime/realtime.service");
const sms_service_1 = require("../events/sms.service");
const email_service_1 = require("../events/email.service");
let EventsService = class EventsService {
    prisma;
    rt;
    sms;
    email;
    constructor(prisma, rt, sms, email) {
        this.prisma = prisma;
        this.rt = rt;
        this.sms = sms;
        this.email = email;
    }
    async createEvent(input) {
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
        this.email.sendEmail("dmguza@gmail.com", "[Alerta] Veci-placa Alerta reportada", "Alerta reportada - Vehículo detectado: " + input.plate, "<h2>🚨 Alerta Sistema Veci-placa</h2><p>Vehículo detectado: <b>" + input.plate + "</b></p>");
        return event;
    }
    async search(params) {
        const take = Math.min(params.take ?? 50, 200);
        const skip = params.skip ?? 0;
        const where = {};
        if (params.plate)
            where.plate = { contains: params.plate, mode: "insensitive" };
        if (params.cameraId)
            where.cameraId = params.cameraId;
        if (params.minConfidence != null)
            where.confidence = { gte: params.minConfidence };
        if (params.isAlert != null)
            where.isAlert = params.isAlert;
        if (params.from || params.to) {
            where.capturedAt = {};
            if (params.from)
                where.capturedAt.gte = params.from;
            if (params.to)
                where.capturedAt.lte = params.to;
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
    async search2(query) {
        const { plate, cameraId, isAlert, from, to, page = "1", limit = "20", } = query;
        const where = {};
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
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        realtime_service_1.RealtimeService,
        sms_service_1.SmsService,
        email_service_1.EmailService])
], EventsService);
//# sourceMappingURL=events.service.js.map