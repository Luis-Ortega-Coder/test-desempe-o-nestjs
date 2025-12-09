// src/technicians/dto/update-technician.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTechnicianDto } from './create-technician.dto';
export class UpdateTechnicianDto extends PartialType(CreateTechnicianDto) {}