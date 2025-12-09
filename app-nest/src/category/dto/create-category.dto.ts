// src/categories/dto/create-category.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Hardware Incident' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Issues related to physical devices', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

