"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.0",
    "engineVersion": "ab56fe763f921d033a6c195e7ddeb3e255bdbb57",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Role {\n  ADMIN\n  OPERATOR\n  ANALYST\n}\n\nenum AlertType {\n  BLACKLIST\n  WATCHLIST\n}\n\nmodel User {\n  id               String   @id @default(uuid())\n  email            String   @unique\n  passwordHash     String\n  role             Role     @default(ANALYST)\n  enabled          Boolean  @default(true)\n  refreshTokenHash String?\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"refreshTokenHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"email\",\"passwordHash\",\"Role\",\"role\",\"enabled\",\"refreshTokenHash\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\"]"),
    graph: "OgkQCxoAACwAMBsAAAQAEBwAACwAMB0BAAAAAR4BAAAAAR8BAC0AISEAAC4hIiIgAC8AISMBADAAISRAADEAISVAADEAIQEAAAABACABAAAAAQAgCxoAACwAMBsAAAQAEBwAACwAMB0BAC0AIR4BAC0AIR8BAC0AISEAAC4hIiIgAC8AISMBADAAISRAADEAISVAADEAIQEjAAAyACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAIHQEAAAABHgEAAAABHwEAAAABIQAAACECIiAAAAABIwEAAAABJEAAAAABJUAAAAABAQgAAAkAIAgdAQAAAAEeAQAAAAEfAQAAAAEhAAAAIQIiIAAAAAEjAQAAAAEkQAAAAAElQAAAAAEBCAAACwAwAQgAAAsAMAgdAQA2ACEeAQA2ACEfAQA2ACEhAAA3ISIiIAA4ACEjAQA5ACEkQAA6ACElQAA6ACECAAAAAQAgCAAADgAgCB0BADYAIR4BADYAIR8BADYAISEAADchIiIgADgAISMBADkAISRAADoAISVAADoAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBBUAADMAIBYAADUAIBcAADQAICMAADIAIAsaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEhAAAcISIiIAAdACEjAQAeACEkQAAfACElQAAfACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAsaAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEhAAAcISIiIAAdACEjAQAeACEkQAAfACElQAAfACEOFQAAIQAgFgAAKwAgFwAAKwAgJgEAAAABJwEAAAAEKAEAAAAEKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAKgAhLgEAAAABLwEAAAABMAEAAAABBxUAACEAIBYAACkAIBcAACkAICYAAAAhAicAAAAhCCgAAAAhCC0AACghIgUVAAAhACAWAAAnACAXAAAnACAmIAAAAAEtIAAmACEOFQAAJAAgFgAAJQAgFwAAJQAgJgEAAAABJwEAAAAFKAEAAAAFKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAIwAhLgEAAAABLwEAAAABMAEAAAABCxUAACEAIBYAACIAIBcAACIAICZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACAAIQsVAAAhACAWAAAiACAXAAAiACAmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEtQAAgACEIJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAIQAhCCZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACIAIQ4VAAAkACAWAAAlACAXAAAlACAmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAjACEuAQAAAAEvAQAAAAEwAQAAAAEIJgIAAAABJwIAAAAFKAIAAAAFKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAJAAhCyYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACUAIS4BAAAAAS8BAAAAATABAAAAAQUVAAAhACAWAAAnACAXAAAnACAmIAAAAAEtIAAmACECJiAAAAABLSAAJwAhBxUAACEAIBYAACkAIBcAACkAICYAAAAhAicAAAAhCCgAAAAhCC0AACghIgQmAAAAIQInAAAAIQgoAAAAIQgtAAApISIOFQAAIQAgFgAAKwAgFwAAKwAgJgEAAAABJwEAAAAEKAEAAAAEKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAKgAhLgEAAAABLwEAAAABMAEAAAABCyYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACsAIS4BAAAAAS8BAAAAATABAAAAAQsaAAAsADAbAAAEABAcAAAsADAdAQAtACEeAQAtACEfAQAtACEhAAAuISIiIAAvACEjAQAwACEkQAAxACElQAAxACELJgEAAAABJwEAAAAEKAEAAAAEKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAKwAhLgEAAAABLwEAAAABMAEAAAABBCYAAAAhAicAAAAhCCgAAAAhCC0AACkhIgImIAAAAAEtIAAnACELJgEAAAABJwEAAAAFKAEAAAAFKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAJQAhLgEAAAABLwEAAAABMAEAAAABCCZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACIAIQAAAAABMQEAAAABATEAAAAhAgExIAAAAAEBMQEAAAABATFAAAAAAQAAAAADFQAGFgAHFwAIAAAAAxUABhYABxcACAECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhgYBRkZCQ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map