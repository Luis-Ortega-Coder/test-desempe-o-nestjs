// src/auth/dto/register.dto.ts
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
  @IsEnum(['admin', 'technician', 'client']) role: string;
}

// src/auth/dto/login.dto.ts
export class LoginDto {
  @IsEmail() email: string;
  @IsString() password: string;
}