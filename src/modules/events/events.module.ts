import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { RealtimeModule } from "../realtime/realtime.module";
import { SmsService } from "./sms.service";

@Module({
  imports: [RealtimeModule],
  providers: [EventsService, SmsService],
  controllers: [EventsController],
  exports: [EventsService, SmsService],
})
export class EventsModule {}
