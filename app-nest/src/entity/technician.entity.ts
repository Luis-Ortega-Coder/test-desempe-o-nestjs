import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column({ default: true })
  availability: boolean;

  @OneToMany(() => Ticket, ticket => ticket.technician)
  tickets: Ticket[];
}
