import { IsString, IsEnum, IsUUID } from "class-validator"
export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['low', 'medium', 'high'])
  priority: string;

  @IsUUID()
  clientId: string;

  @IsUUID()
  categoryId: string;
}