// src/tickets/tickets.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { TicketsRepository } from './ticket.repository';
import { TicketsService } from './ticket.service';
import { TicketsController } from './ticket.controller';
import { ClientModule } from '../client/client.module';
import { TechniciansModule } from '../technician/technician.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    ClientModule,
    TechniciansModule,
    CategoryModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsRepository, TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}