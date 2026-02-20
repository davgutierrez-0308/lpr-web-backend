import {
  IsOptional,
  IsString,
  IsBooleanString,
  IsNumberString,
} from "class-validator";

export class SearchEventsDto {
  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsString()
  cameraId?: string;

  @IsOptional()
  @IsBooleanString()
  isAlert?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
