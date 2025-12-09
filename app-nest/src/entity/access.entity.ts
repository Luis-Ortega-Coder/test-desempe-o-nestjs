import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('access')
export class Access {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    company: string;

    @Column()
    email: string;
    
    @Column()
    status: boolean;
}