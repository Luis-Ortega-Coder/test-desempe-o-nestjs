// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ExceptionFactory } from '../../common/exceptions/exception.factory';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (await this.usersRepo.existsByEmail(dto.email))
      throw ExceptionFactory.conflict('Email already registered');

    const password = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.repo.create({ ...dto, password });
    return this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.repo.find({ where: { deletedAt: null } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOneById(id);
    if (!user) throw ExceptionFactory.notFound('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepo.softDelete(id);
  }
}