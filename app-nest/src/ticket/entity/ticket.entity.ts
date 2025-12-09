import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Client } from '../../client/entity/client.entity';
import { Technician } from '../../technician/entitities/technician.entity';
import { Category } from '../../category/entities/category.entities';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'enum', enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' })
  status!: TicketStatus;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
  priority!: TicketPriority;

  @ManyToOne(() => Client, { eager: true, nullable: false })
  client!: Client;

  @ManyToOne(() => Technician, { eager: true, nullable: true })
  technician?: Technician;

  @ManyToOne(() => Category, { eager: true, nullable: false })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}