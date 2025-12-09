import { Repository, DataSource } from "typeorm";
import { Ticket } from "./entity/ticket.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketRepository{
    private readonly repo: Repository<Ticket>;

    constructor(private readonly dataSource: DataSource){
        this.repo = this.dataSource.getRepository(Ticket)
    }

    // --- base CRUD ---
  save(ticket: Partial<Ticket>)           { return this.repo.save(ticket); }
  findOneById(id: string)             { return this.repo.findOneBy({ id, deletedAt: null }); }
  async softDelete(id: string)        { await this.repo.softDelete(id); }
}

    
