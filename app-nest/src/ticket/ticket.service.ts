// src/tickets/tickets.service.ts
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from './ticket.repository';
import { Ticket } from './entity/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ExceptionFactory } from '../common/exceptions/exception.factory';
import { ClientsService } from '../client/client.service';
import { Category } from '../category/entities/category.entities';
import { CategoriesService } from '../category/category.service';
import { TechniciansService } from 'src/technician/technician.service';

@Injectable()
export class TicketsService {
constructor(
  private readonly ticketRepo: TicketsRepository,
  private readonly clientsService: ClientsService,  
  private readonly techniciansService: TechniciansService,
  private readonly categoriesService: CategoriesService,
) {}

 async create(dto: CreateTicketDto): Promise<Ticket> {
  const client  = await this.clientsService.findOne(dto.clientId);
  const category = await this.categoriesService.findOne(dto.categoryId);
  // ✅ sin tocar repo interno
  return this.ticketRepo.save({
    ...dto,
    client,
    category,
  });
}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.findAll();
  }

  async findOne(id: string): Promise<Ticket> {
    const t = await this.ticketRepo.findOneById(id);
    if (!t) throw ExceptionFactory.notFound('Ticket not found');
    return t;
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    if (dto.clientId) ticket.client = await this.clientsService.findOne(dto.clientId);
    if (dto.categoryId) ticket.category = await this.categoriesService.findOne(dto.categoryId);
    Object.assign(ticket, dto);
    return this.ticketRepo.save(ticket);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.ticketRepo.softDelete(id);
  }

  async changeStatus(id: string, dto: ChangeStatusDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.status = dto.status;
    return this.ticketRepo.save(ticket);
  }

  async findByClient(clientId: string): Promise<Ticket[]> {
    return this.ticketRepo.findByClient(clientId);
  }

  async findByTechnician(technicianId: string): Promise<Ticket[]> {
    return this.ticketRepo.findByTechnician(technicianId);
  }
}