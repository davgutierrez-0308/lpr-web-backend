import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { Role } from "@prisma/client";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(email: string, password: string, role: Role): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        enabled: boolean;
        createdAt: Date;
    }>;
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        enabled: boolean;
        createdAt: Date;
    }[]>;
    disable(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        enabled: boolean;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
