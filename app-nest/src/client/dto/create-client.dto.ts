// src/clients/dto/create-client.dto.ts
import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ACME S.A.' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'juan@acme.com' })
  @IsEmail()
  contactEmail: string;
}
