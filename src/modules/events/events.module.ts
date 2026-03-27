import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { RealtimeModule } from "../realtime/realtime.module";
import { SmsService } from "./sms.service";
import { EmailService } from "./email.service";

@Module({
  imports: [RealtimeModule],
  providers: [EventsService, SmsService, EmailService],
  controllers: [EventsController],
  exports: [EventsService, SmsService, EmailService],
})
export class EventsModule {}
