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
exports.EdgesController = void 0;
const common_1 = require("@nestjs/common");
const edges_service_1 = require("./edges.service");
const create_edge_dto_1 = require("./dto/create-edge.dto");
const update_edge_dto_1 = require("./dto/update-edge.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../../common/security/roles.guard");
const roles_decorator_1 = require("../../common/security/roles.decorator");
const client_1 = require("@prisma/client");
let EdgesController = class EdgesController {
    edgesService;
    constructor(edgesService) {
        this.edgesService = edgesService;
    }
    findAll() {
        return this.edgesService.findAll();
    }
    create(dto) {
        return this.edgesService.create(dto);
    }
    update(id, dto) {
        return this.edgesService.update(id, dto);
    }
    remove(id) {
        return this.edgesService.remove(id);
    }
};
exports.EdgesController = EdgesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EdgesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_edge_dto_1.CreateEdgeDto]),
    __metadata("design:returntype", void 0)
], EdgesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_edge_dto_1.UpdateEdgeDto]),
    __metadata("design:returntype", void 0)
], EdgesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EdgesController.prototype, "remove", null);
exports.EdgesController = EdgesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)("edges"),
    __metadata("design:paramtypes", [edges_service_1.EdgesService])
], EdgesController);
//# sourceMappingURL=edges.controller.js.map