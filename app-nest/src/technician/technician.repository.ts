// src/technicians/technicians.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Technician } from './entitities/technician.entity';

@Injectable()
export class TechniciansRepository {
  private readonly repo: Repository<Technician>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Technician);
  }

  save(t: Partial<Technician>)        { return this.repo.save(t); }
  findAll()                           { return this.repo.find({ where: { deletedAt: undefined } }); }
  findOneById(id: string)             { return this.repo.findOneBy({ id, deletedAt: undefined }); }
  async softDelete(id: string)        { await this.repo.softDelete(id); }
}