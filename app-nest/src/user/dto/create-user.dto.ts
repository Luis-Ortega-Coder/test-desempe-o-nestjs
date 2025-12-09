import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ana García' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ana@tech.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['admin', 'technician', 'client'] })
  @IsEnum(['admin', 'technician', 'client'])
  role: string;
}