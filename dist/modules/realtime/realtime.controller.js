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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
const realtime_service_1 = require("./realtime.service");
const jwt_1 = require("@nestjs/jwt");
let RealtimeController = class RealtimeController {
    rt;
    config;
    jwtService;
    constructor(rt, config, jwtService) {
        this.rt = rt;
        this.config = config;
        this.jwtService = jwtService;
    }
    sse(token) {
        console.log(token);
        console.log("SECRET:", this.config.get("JWT_ACCESS_SECRET"));
        if (!token) {
            throw new common_1.UnauthorizedException("Missing token");
        }
        try {
            this.jwtService.verify(token, {
                secret: this.config.getOrThrow("JWT_ACCESS_SECRET"),
            });
        }
        catch (err) {
            console.log("JWT ERROR:", err);
            throw new common_1.UnauthorizedException("Invalid token");
        }
        console.log(token);
        const hbMs = Number(this.config.get("SSE_HEARTBEAT_MS") ?? 15000);
        const heartbeat$ = (0, rxjs_1.interval)(hbMs).pipe((0, rxjs_1.map)(() => ({
            type: "heartbeat",
            data: { ts: new Date().toISOString() },
        })), (0, rxjs_1.map)((evt) => ({ data: evt })));
        console.log(token);
        const events$ = this.rt.observable().pipe((0, rxjs_1.map)((evt) => ({ data: evt })));
        return (0, rxjs_1.merge)(events$, heartbeat$);
    }
};
exports.RealtimeController = RealtimeController;
__decorate([
    (0, common_1.Sse)("events"),
    __param(0, (0, common_1.Query)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], RealtimeController.prototype, "sse", null);
exports.RealtimeController = RealtimeController = __decorate([
    (0, common_1.Controller)("realtime"),
    __metadata("design:paramtypes", [realtime_service_1.RealtimeService, config_1.ConfigService, jwt_1.JwtService])
], RealtimeController);
//# sourceMappingURL=realtime.controller.js.map