import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../entity/client.entity';
import { Technician } from '../../entity/technician.entity';
import { Category } from '../../entity/category.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' })
  status: string;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @ManyToOne(() => Client, c => c.tickets, { nullable: false })
  client: Client;

  @ManyToOne(() => Technician, t => t.tickets, { nullable: true })
  technician: Technician;

  @ManyToOne(() => Category, c => c.tickets, { nullable: false })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
