import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { EdgesController } from "./edges.controller";
import { EdgesService } from "./edges.service";

@Module({
  imports: [PrismaModule],
  controllers: [EdgesController],
  providers: [EdgesService],
  exports: [EdgesService],
})
export class EdgesModule {}