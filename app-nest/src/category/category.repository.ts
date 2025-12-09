// src/categories/categories.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entities';

@Injectable()
export class CategoriesRepository {
  private readonly repo: Repository<Category>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Category);
  }

  save(c: Partial<Category>)        { return this.repo.save(c); }
  findAll()                         { return this.repo.find({ where: { deletedAt: undefined } }); }
  findOneById(id: string)           { return this.repo.findOneBy({ id, deletedAt: undefined }); }
  async existsByName(name: string)  { return await this.repo.exist({ where: { name } }); }
  async softDelete(id: string)      { await this.repo.softDelete(id); }
}