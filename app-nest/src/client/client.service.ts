// src/clients/clients.service.ts
import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './client.repository';
import { Client } from './entity/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ExceptionFactory } from '../common/exceptions/exception.factory';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepo: ClientsRepository) {}

  async create(dto: CreateClientDto): Promise<Client> {
   const client = Object.assign(new Client(), dto);
    return this.clientRepo.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepo.findAll();
  }

  async findOne(id: string): Promise<Client> {
    const c = await this.clientRepo.findOneById(id);
    if (!c) throw ExceptionFactory.notFound('Client not found');
    return c;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientRepo.save(client);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.clientRepo.softDelete(id);
  }
}