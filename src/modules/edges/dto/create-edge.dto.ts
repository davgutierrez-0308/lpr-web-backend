import { IsOptional, IsString } from "class-validator";

export class CreateEdgeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  status?: string;
}