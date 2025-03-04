import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, Ticket } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTicketDto: Prisma.TicketUncheckedCreateInput,
  ): Promise<Ticket> {
    try {
      return await this.prisma.ticket.create({
        data: createTicketDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create ticket');
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.prisma.ticket.findMany();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });
    if (!ticket) {
      throw new NotFoundException('Could not find ticket');
    }
    return ticket;
  }

  async update(
    id: number,
    updateTicketDto: Prisma.TicketUncheckedUpdateInput,
  ): Promise<Ticket> {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not update ticket with id ${id}`);
    }
  }

  async remove(id: number): Promise<Ticket> {
    try {
      return await this.prisma.ticket.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not delete ticket with id ${id}`);
    }
  }
}
