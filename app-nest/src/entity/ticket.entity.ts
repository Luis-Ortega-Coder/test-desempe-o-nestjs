import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from './client.entity';
import { Technician } from './technician.entity';
import { Category } from './category.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['Abierto','En progreso','Resuelto','Cerrado'], default: 'Abierto' })
  status: 'Abierto' | 'En progreso' | 'Resuelto' | 'Cerrado';

  @Column({ type: 'enum', enum: ['Baja','Media','Alta'], default: 'Baja' })
  priority: 'Baja' | 'Media' | 'Alta';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.tickets, { nullable: false, onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Client, client => client.tickets, { nullable: false, onDelete: 'CASCADE' })
  client: Client;

  @ManyToOne(() => Technician, technician => technician.tickets, { nullable: true, onDelete: 'SET NULL' })
  technician: Technician;
}
