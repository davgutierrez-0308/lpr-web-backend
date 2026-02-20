import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { CamerasController } from "./cameras.controller";
import { CamerasService } from "./cameras.service";

@Module({
  imports: [PrismaModule],
  controllers: [CamerasController],
  providers: [CamerasService],
  exports: [CamerasService],
})
export class CamerasModule {}