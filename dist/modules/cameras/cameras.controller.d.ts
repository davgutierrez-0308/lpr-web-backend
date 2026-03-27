import { CamerasService } from "./cameras.service";
import { CreateCameraDto } from "./dto/create-camera.dto";
import { UpdateCameraDto } from "./dto/update-camera.dto";
export declare class CamerasController {
    private readonly camerasService;
    constructor(camerasService: CamerasService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        edgeNode: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            location: string | null;
            status: string;
            lastSeenAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        rtspUrl: string | null;
        edgeNodeId: string | null;
        status: string;
        lastSeenAt: Date | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CameraClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        rtspUrl: string | null;
        edgeNodeId: string | null;
        status: string;
        lastSeenAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateCameraDto): import("@prisma/client").Prisma.Prisma__CameraClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        rtspUrl: string | null;
        edgeNodeId: string | null;
        status: string;
        lastSeenAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateCameraDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        rtspUrl: string | null;
        edgeNodeId: string | null;
        status: string;
        lastSeenAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        rtspUrl: string | null;
        edgeNodeId: string | null;
        status: string;
        lastSeenAt: Date | null;
    }>;
}
