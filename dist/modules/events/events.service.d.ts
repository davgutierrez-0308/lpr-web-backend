import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { RealtimeService } from "../realtime/realtime.service";
import { SmsService } from "../events/sms.service";
import { EmailService } from "../events/email.service";
export declare class EventsService {
    private prisma;
    private rt;
    private sms;
    private email;
    constructor(prisma: PrismaService, rt: RealtimeService, sms: SmsService, email: EmailService);
    createEvent(input: {
        plate: string;
        confidence: number;
        cameraId: string;
        capturedAt?: Date;
        imageUrl?: string;
        raw?: any;
    }): Promise<{
        id: string;
        plate: string;
        confidence: number;
        cameraId: string;
        capturedAt: Date;
        imageUrl: string | null;
        isAlert: boolean;
        alertType: import("@prisma/client").$Enums.AlertType | null;
        raw: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    search(params: {
        plate?: string;
        cameraId?: string;
        from?: Date;
        to?: Date;
        minConfidence?: number;
        isAlert?: boolean;
        skip?: number;
        take?: number;
    }): Promise<{
        items: {
            id: string;
            plate: string;
            confidence: number;
            cameraId: string;
            capturedAt: Date;
            imageUrl: string | null;
            isAlert: boolean;
            alertType: import("@prisma/client").$Enums.AlertType | null;
            raw: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        skip: number;
        take: number;
    }>;
    search2(query: any): Promise<{
        data: {
            id: string;
            plate: string;
            confidence: number;
            cameraId: string;
            capturedAt: Date;
            imageUrl: string | null;
            isAlert: boolean;
            alertType: import("@prisma/client").$Enums.AlertType | null;
            raw: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
