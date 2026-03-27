import { EventsService } from "./events.service";
import { SearchEventsDto } from "./dto/search-events.dto";
declare class CreateEventDto {
    plate: string;
    confidence: number;
    cameraId: string;
    imageUrl?: string;
}
export declare class EventsController {
    private events;
    constructor(events: EventsService);
    create(dto: CreateEventDto): Promise<{
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
    findAll(query: SearchEventsDto): Promise<{
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
    search(plate?: string, cameraId?: string, from?: string, to?: string, minConfidence?: string, isAlert?: string, skip?: string, take?: string): Promise<{
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
}
export {};
