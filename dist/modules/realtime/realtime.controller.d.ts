import { MessageEvent } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { RealtimeService } from "./realtime.service";
import { JwtService } from "@nestjs/jwt";
export declare class RealtimeController {
    private rt;
    private config;
    private jwtService;
    constructor(rt: RealtimeService, config: ConfigService, jwtService: JwtService);
    sse(token: string): Observable<MessageEvent>;
}
