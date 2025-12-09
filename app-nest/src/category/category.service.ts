// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';
import { Category } from './entities/category.entities';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionFactory } from '../common/exceptions/exception.factory';

@Injectable()
export class CategoriesService {
  constructor(private readonly catRepo: CategoriesRepository) {}

  // src/categories/categories.service.ts
async create(dto: CreateCategoryDto): Promise<Category> {
  if (await this.catRepo.existsByName(dto.name))
    throw ExceptionFactory.conflict('Category name already exists');

  return this.catRepo.save(dto); // save acepta un plain-object
}

  findAll(): Promise<Category[]> {
    return this.catRepo.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const c = await this.catRepo.findOneById(id);
    if (!c) throw ExceptionFactory.notFound('Category not found');
    return c;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const cat = await this.findOne(id);
    if (dto.name && dto.name !== cat.name && (await this.catRepo.existsByName(dto.name)))
      throw ExceptionFactory.conflict('Category name already exists');
    Object.assign(cat, dto);
    return this.catRepo.save(cat);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.catRepo.softDelete(id);
  }
}