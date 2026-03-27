import { Role } from "@prisma/client";
import { UsersService } from "./users.service";
declare class CreateUserDto {
    email: string;
    password: string;
    role: Role;
}
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    create(dto: CreateUserDto): Promise<{
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
export {};
