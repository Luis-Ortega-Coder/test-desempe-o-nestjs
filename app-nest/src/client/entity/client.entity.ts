// src/clients/entities/client.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entity/ticket.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 120 })
  name!: string;

  @Column({ length: 120 })
  company!: string;

  @Column({ length: 180 })
  contactEmail!: string;

  @OneToMany(() => Ticket, t => t.client)
  tickets?: Ticket[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}