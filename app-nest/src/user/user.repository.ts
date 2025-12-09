// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  private readonly repo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(User);
  }

  // --- base CRUD ---
  save(user: Partial<User>)           { return this.repo.save(user); }
  findOneById(id: string)             { return this.repo.findOneBy({ id, deletedAt: undefined }); }
  findOneByEmail(email: string)       { return this.repo.findOneBy({ email, deletedAt: undefined }); }
  findAllActive() {
  return this.repo.find({ where: { deletedAt: undefined } });
}
  async softDelete(id: string)        { await this.repo.softDelete(id); }
  async existsByEmail(email: string)  { return await this.repo.exist({ where: { email } }); }
}