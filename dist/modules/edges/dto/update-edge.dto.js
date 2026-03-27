"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEdgeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_edge_dto_1 = require("./create-edge.dto");
class UpdateEdgeDto extends (0, mapped_types_1.PartialType)(create_edge_dto_1.CreateEdgeDto) {
}
exports.UpdateEdgeDto = UpdateEdgeDto;
//# sourceMappingURL=update-edge.dto.js.map