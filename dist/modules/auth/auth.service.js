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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const crypto_1 = require("./crypto");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    accessTtl() {
        return Number(this.config.get("JWT_ACCESS_TTL") ?? 900);
    }
    refreshTtl() {
        return Number(this.config.get("JWT_REFRESH_TTL") ?? 604800);
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !user.enabled)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const ok = await (0, crypto_1.verify)(password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const accessToken = await this.jwt.signAsync({ email: user.email, role: user.role }, { secret: this.config.getOrThrow("JWT_ACCESS_SECRET"), subject: user.id, expiresIn: this.accessTtl() });
        const refreshToken = await this.jwt.signAsync({ email: user.email, role: user.role }, { secret: this.config.getOrThrow("JWT_REFRESH_SECRET"), subject: user.id, expiresIn: this.refreshTtl() });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshTokenHash: await (0, crypto_1.hash)(refreshToken) },
        });
        return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } };
    }
    async refresh(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user?.refreshTokenHash)
            throw new common_1.UnauthorizedException("No refresh stored");
        const ok = await (0, crypto_1.verify)(refreshToken, user.refreshTokenHash);
        if (!ok)
            throw new common_1.UnauthorizedException("Invalid refresh token");
        const accessToken = await this.jwt.signAsync({ email: user.email, role: user.role }, { secret: this.config.getOrThrow("JWT_ACCESS_SECRET"), subject: user.id, expiresIn: this.accessTtl() });
        return { accessToken };
    }
    async logout(userId) {
        await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: null } });
        return { ok: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map