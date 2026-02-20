import { IsEnum, IsOptional, IsString } from "class-validator";
import { AlertType } from "@prisma/client";

export class CreateAlertDto {
  @IsString()
  plate: string;

  @IsEnum(AlertType)
  type: AlertType;

  @IsOptional()
  @IsString()
  description?: string;
}
