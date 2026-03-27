import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";
export declare class AlertsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAlertDto, userId?: string): Promise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__AlertPlateClient<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateAlertDto): Promise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }>;
    toggle(id: string): Promise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }>;
}
