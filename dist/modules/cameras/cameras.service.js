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
exports.CamerasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
let CamerasService = class CamerasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
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
        });
    }
    findOne(id) {
        return this.prisma.camera.findUnique({ where: { id } });
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (!existing)
            throw new common_1.NotFoundException("Camera not found");
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
    async remove(id) {
        const existing = await this.findOne(id);
        if (!existing)
            throw new common_1.NotFoundException("Camera not found");
        return this.prisma.camera.delete({ where: { id } });
    }
};
exports.CamerasService = CamerasService;
exports.CamerasService = CamerasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CamerasService);
//# sourceMappingURL=cameras.service.js.map