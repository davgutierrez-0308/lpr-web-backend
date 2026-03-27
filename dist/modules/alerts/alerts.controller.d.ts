import { AlertsService } from "./alerts.service";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    create(dto: CreateAlertDto, req: any): Promise<{
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
    update(id: string, dto: UpdateAlertDto): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        enabled: boolean;
        createdAt: Date;
        plate: string;
        type: import("@prisma/client").$Enums.AlertType;
        description: string | null;
        createdById: string | null;
    }>;
}
