"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.verify = verify;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hash(value) {
    const saltRounds = 10;
    return bcrypt_1.default.hash(value, saltRounds);
}
async function verify(value, hashed) {
    return bcrypt_1.default.compare(value, hashed);
}
//# sourceMappingURL=crypto.js.map