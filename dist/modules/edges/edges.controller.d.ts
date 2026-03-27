import { EdgesService } from "./edges.service";
import { CreateEdgeDto } from "./dto/create-edge.dto";
import { UpdateEdgeDto } from "./dto/update-edge.dto";
export declare class EdgesController {
    private readonly edgesService;
    constructor(edgesService: EdgesService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        cameras: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            location: string | null;
            rtspUrl: string | null;
            edgeNodeId: string | null;
            status: string;
            lastSeenAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        status: string;
        lastSeenAt: Date | null;
    })[]>;
    create(dto: CreateEdgeDto): import("@prisma/client").Prisma.Prisma__EdgeNodeClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        status: string;
        lastSeenAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateEdgeDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        status: string;
        lastSeenAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string | null;
        status: string;
        lastSeenAt: Date | null;
    }>;
}
