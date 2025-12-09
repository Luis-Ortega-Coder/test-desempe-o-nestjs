import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../ticket/entity/ticket.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  contactEmail: string;

  @OneToMany(() => Ticket, t => t.client)
  tickets: Ticket[];
}
