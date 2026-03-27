"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgesModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
const edges_controller_1 = require("./edges.controller");
const edges_service_1 = require("./edges.service");
let EdgesModule = class EdgesModule {
};
exports.EdgesModule = EdgesModule;
exports.EdgesModule = EdgesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [edges_controller_1.EdgesController],
        providers: [edges_service_1.EdgesService],
        exports: [edges_service_1.EdgesService],
    })
], EdgesModule);
//# sourceMappingURL=edges.module.js.map