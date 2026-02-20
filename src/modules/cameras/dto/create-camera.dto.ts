import { IsOptional, IsString } from "class-validator";

export class CreateCameraDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  rtspUrl?: string;

  @IsOptional()
  @IsString()
  edgeNodeId?: string;

  @IsOptional()
  @IsString()
  status?: string; // opcional (ej: ONLINE/OFFLINE/DESCONOCIDO)
}