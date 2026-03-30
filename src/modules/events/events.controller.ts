import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EventsService } from "./events.service";
import { IsNumber, IsOptional, IsString, IsUUID, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { SearchEventsDto } from "./dto/search-events.dto";

class CreateEventDto {
  @IsString() plate!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence!: number;

  @IsUUID()
  cameraId!: string;

  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() vehicleUrl?: string;
}

@UseGuards(JwtAuthGuard)
@Controller("events")
export class EventsController {
  constructor(private events: EventsService) {}

  // Endpoint útil para pruebas (en producción lo usaría el ingestor)
  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.events.createEvent(dto);
  }

  @Get()
  findAll(@Query() query: SearchEventsDto) {
    return this.events.search2(query);
  }

  @Get("search")
  search(
    @Query("plate") plate?: string,
    @Query("cameraId") cameraId?: string,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("minConfidence") minConfidence?: string,
    @Query("isAlert") isAlert?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    return this.events.search({
      plate,
      cameraId,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      minConfidence: minConfidence != null ? Number(minConfidence) : undefined,
      isAlert: isAlert != null ? isAlert === "true" : undefined,
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }
}
