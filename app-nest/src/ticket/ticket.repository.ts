// src/tickets/tickets.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './entity/ticket.entity';

@Injectable()
export class TicketsRepository {
  private readonly repo: Repository<Ticket>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Ticket);
  }

  // --- CRUD base ---
  save(t: Partial<Ticket>)              { return this.repo.save(t); }
  findOneById(id: string)               { return this.repo.findOne({ where: { id, deletedAt: undefined }, relations: ['client', 'technician', 'category'] }); }
  findAll()                             { return this.repo.find({ where: { deletedAt: undefined }, relations: ['client', 'technician', 'category'] }); }
  async softDelete(id: string)          { await this.repo.softDelete(id); }

  // --- queries simples ---
  findByClient(clientId: string) {
    return this.repo.find({ where: { client: { id: clientId }, deletedAt: undefined }, relations: ['technician', 'category'] });
  }
  findByTechnician(technicianId: string) {
    return this.repo.find({ where: { technician: { id: technicianId }, deletedAt: undefined }, relations: ['client', 'category'] });
  }
  countInProgress(technicianId: string) {
    return this.repo.countBy({ technician: { id: technicianId }, status: 'in_progress' });
  }
}