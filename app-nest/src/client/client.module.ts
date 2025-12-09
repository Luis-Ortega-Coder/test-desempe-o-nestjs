// src/clients/clients.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { ClientsRepository } from './client.repository';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsRepository, ClientsService],
  exports: [ClientsService],
})
export class ClientModule {}