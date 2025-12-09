// src/technicians/dto/create-technician.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicianDto {
  @ApiProperty({ example: 'Carlos López' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Hardware' })
  @IsString()
  specialty: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  availability?: boolean = true;
}