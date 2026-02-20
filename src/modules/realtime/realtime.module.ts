import { Module } from "@nestjs/common";
import { RealtimeService } from "./realtime.service";
import { RealtimeController } from "./realtime.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow("JWT_ACCESS_SECRET"),
      }),
    }),
  ],
  providers: [RealtimeService],
  controllers: [RealtimeController],
  exports: [RealtimeService], // 👈 IMPORTANTE
})
export class RealtimeModule {}
