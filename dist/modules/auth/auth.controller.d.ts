import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { LoginDto, RefreshDto } from "./dto";
export declare class AuthController {
    private auth;
    private jwt;
    private config;
    constructor(auth: AuthService, jwt: JwtService, config: ConfigService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        ok: boolean;
    }>;
}
