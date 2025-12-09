// src/tickets/tickets.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTicketDto) {
    return this.ticketsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ticketsService.remove(id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ChangeStatusDto) {
    return this.ticketsService.changeStatus(id, dto);
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return this.ticketsService.findByClient(clientId);
  }

  @Get('technician/:technicianId')
  findByTechnician(@Param('technicianId', ParseUUIDPipe) technicianId: string) {
    return this.ticketsService.findByTechnician(technicianId);
  }
}