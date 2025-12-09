// src/technicians/entities/technician.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entity/ticket.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'varchar', length: 120, nullable: false })
  name!: string;

  @Column({type: 'varchar', length: 120, nullable: false })
  specialty!: string;

  @Column({type: 'boolean', default: true, nullable: false })
  availability!: boolean;

 
  @OneToMany(() => Ticket, (t: Ticket) => t.technician)
  tickets?: Ticket[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}