import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../ticket/entity/ticket.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column({ default: true })
  availability: boolean;

  @OneToMany(() => Ticket, t => t.technician)
  tickets: Ticket[];
}
