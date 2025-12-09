// src/technicians/technicians.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technician } from './entitities/technician.entity';
import { TechniciansRepository } from './technician.repository';
import { TechniciansService } from './technician.service';
import { TechniciansController } from './technician.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Technician])],
  controllers: [TechniciansController],
  providers: [TechniciansRepository, TechniciansService],
  exports: [TechniciansService], // <-- para que otros módulos lo usen
})
export class TechniciansModule {}