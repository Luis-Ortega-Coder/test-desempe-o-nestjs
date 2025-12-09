// src/clients/clients.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientsRepository {
  private readonly repo: Repository<Client>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Client);
  }

  save(c: Partial<Client>)        { return this.repo.save(c); }
  findAll()                       { return this.repo.find({ where: { deletedAt: undefined } }); }
  findOneById(id: string)         { return this.repo.findOneBy({ id, deletedAt: undefined }); }
  async softDelete(id: string)    { await this.repo.softDelete(id); }
}