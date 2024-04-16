import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createGameDto: CreateGameDto) {
    return this.prismaService.game.create({
      data: createGameDto,
    });
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return this.prismaService.game.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.prismaService.game.update({
      where: {
        id,
      },
      data: updateGameDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.file.deleteMany({
      where: { gameId: id },
    });

    return this.prismaService.game.delete({
      where: {
        id,
      },
    });
  }

  findAllForGameMaster(id: number) {
    return this.prismaService.game.findMany({
      where: {
        authorId: id,
      },
    });
  }
}
