import { Controller, MessageEvent, Sse, UseGuards, Query, UnauthorizedException } from "@nestjs/common";
import { Observable, interval, map, merge } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ConfigService } from "@nestjs/config";
import { RealtimeService } from "./realtime.service";
import { JwtService } from "@nestjs/jwt";


//@UseGuards(JwtAuthGuard)
@Controller("realtime")
export class RealtimeController {
  constructor(private rt: RealtimeService, private config: ConfigService, private jwtService: JwtService) {}

  @Sse("events")
  sse(@Query("token") token: string): Observable<MessageEvent> {
    console.log(token);
    console.log("SECRET:", this.config.get("JWT_ACCESS_SECRET"));
    if (!token) {
      throw new UnauthorizedException("Missing token");
    }

    try {
      this.jwtService.verify(token, {
        secret: this.config.getOrThrow("JWT_ACCESS_SECRET"),
      });
    } catch (err) {
       console.log("JWT ERROR:", err);
      throw new UnauthorizedException("Invalid token");
    }
console.log(token);
    const hbMs = Number(this.config.get("SSE_HEARTBEAT_MS") ?? 15000);

    const heartbeat$ = interval(hbMs).pipe(
      map(() => ({
        type: "heartbeat",
        data: { ts: new Date().toISOString() },
      })),
      map((evt) => ({ data: evt })),
    );
console.log(token);
    const events$ = this.rt.observable().pipe(
      map((evt) => ({ data: evt })),
    );

    return merge(events$, heartbeat$);
  }
}
