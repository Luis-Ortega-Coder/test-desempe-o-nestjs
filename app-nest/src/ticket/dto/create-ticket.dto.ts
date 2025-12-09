// src/tickets/dto/create-ticket.dto.ts
import { IsString, IsEnum, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['low', 'medium', 'high'])
  priority: TicketPriority = 'medium';

  @IsUUID()
  clientId: string;

  @IsUUID()
  categoryId: string;
}
export type TicketPriority = 'low' | 'medium' | 'high';