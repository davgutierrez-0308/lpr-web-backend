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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
let AlertsService = class AlertsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        try {
            return await this.prisma.alertPlate.create({
                data: {
                    plate: dto.plate.toUpperCase(),
                    type: dto.type,
                    description: dto.description,
                    createdById: userId,
                },
            });
        }
        catch (err) {
            if (err.code === "P2002") {
                throw new common_1.ConflictException("Alert already exists for this plate and type");
            }
            throw err;
        }
    }
    findAll() {
        return this.prisma.alertPlate.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    findOne(id) {
        return this.prisma.alertPlate.findUnique({
            where: { id },
        });
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException("Alert not found");
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
        }
        catch (err) {
            if (err.code === "P2002") {
                throw new common_1.ConflictException("Another alert already exists for this plate and type");
            }
            throw err;
        }
    }
    async remove(id) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException("Alert not found");
        }
        return this.prisma.alertPlate.delete({
            where: { id },
        });
    }
    async toggle(id) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException("Alert not found");
        }
        return this.prisma.alertPlate.update({
            where: { id },
            data: {
                enabled: !existing.enabled,
            },
        });
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map