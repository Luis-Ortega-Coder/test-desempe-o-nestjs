// src/technicians/technicians.service.ts
import { Injectable } from '@nestjs/common';
import { TechniciansRepository } from './technician.repository';
import { Technician } from './entitities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { ExceptionFactory } from '../common/exceptions/exception.factory';

@Injectable()
export class TechniciansService {
  constructor(private readonly techRepo: TechniciansRepository) {}

  async create(dto: CreateTechnicianDto): Promise<Technician> {
  const tech = Object.assign(new Technician(), dto);
  return this.techRepo.save(tech);
}

  findAll(): Promise<Technician[]> {
    return this.techRepo.findAll();
  }

  async findOne(id: string): Promise<Technician> {
    const t = await this.techRepo.findOneById(id);
    if (!t) throw ExceptionFactory.notFound('Technician not found');
    return t;
  }

  async update(id: string, dto: UpdateTechnicianDto): Promise<Technician> {
    const tech = await this.findOne(id);
    Object.assign(tech, dto);
    return this.techRepo.save(tech);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.techRepo.softDelete(id);
  }
}