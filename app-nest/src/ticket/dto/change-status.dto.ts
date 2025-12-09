import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export class ChangeStatusDto {
  @ApiProperty({ enum: ['open', 'in_progress', 'resolved', 'closed'] })
  @IsEnum(['open', 'in_progress', 'resolved', 'closed'])
  status: TicketStatus;
}