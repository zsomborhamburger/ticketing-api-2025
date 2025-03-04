import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Board, Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: Prisma.BoardCreateInput): Promise<Board> {
    try {
      return await this.prisma.board.create({
        data: createBoardDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(e.message);
      }
      throw new BadRequestException('Failed to create board');
    }
  }

  async findAll(): Promise<Board[]> {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id },
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async update(
    id: number,
    updateBoardDto: Prisma.BoardUpdateInput,
  ): Promise<Board> {
    try {
      return await this.prisma.board.update({
        where: { id },
        data: updateBoardDto,
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<Board> {
    try {
      return await this.prisma.board.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
