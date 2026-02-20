import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RealtimeModule } from "./modules/realtime/realtime.module";
import { EventsModule } from "./modules/events/events.module";
import { AlertsModule } from "./modules/alerts/alerts.module";
import { CamerasModule } from "./modules/cameras/cameras.module";
import { EdgesModule } from "./modules/edges/edges.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RealtimeModule,
    EventsModule,
    AlertsModule,
    CamerasModule,
    EdgesModule
    // CamerasModule, AlertsModule, DashboardModule (los añadimos luego)
  ],
})
export class AppModule {}
