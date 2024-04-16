import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    game: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

describe('GamesService', () => {
  let service: GamesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService, PrismaService],
    }).compile();

    service = module.get<GamesService>(GamesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('creates a game', async () => {
    const dto = new CreateGameDto();
    const game = { id: 1, ...dto };
    jest.spyOn(prisma.game, 'create').mockResolvedValue(game);

    expect(await service.create(dto)).toEqual(game);
  });

  it('finds a game by ID', async () => {
    const id = 1;
    const game = {
      id,
      authorId: 1,
      city: 'city',
      description: 'description',
      title: 'title',
      slots: 1,
      promptResponse: 'promptResponse',
      theme: 'theme',
    };
    jest.spyOn(prisma.game, 'findUnique').mockResolvedValue(game);

    expect(await service.findOne(id)).toEqual(game);
  });

  it('updates a game', async () => {
    const id = 1;
    const game = {
      id,
      authorId: 1,
      city: 'city',
      description: 'description',
      title: 'title',
      slots: 1,
      promptResponse: 'promptResponse',
      theme: 'theme',
    };
    jest.spyOn(prisma.game, 'update').mockResolvedValue(game);

    expect(await service.update(id, game)).toEqual(game);
  });

  it('deletes a game', async () => {
    const id = 1;
    const game = {
      id,
      authorId: 1,
      city: 'city',
      description: 'description',
      title: 'title',
      slots: 1,
      promptResponse: 'promptResponse',
      theme: 'theme',
    };
    jest.spyOn(prisma.game, 'delete').mockResolvedValue(game);

    expect(await service.remove(id)).toEqual(game);
  });

  it('finds all games for a game master', async () => {
    const id = 1;
    const game = {
      promptResponse: 'promptResponse',
      theme: 'theme',
      authorId: id,
      description: 'description',
      city: 'city',
      slots: 1,
      title: 'title',
      id: 1,
    };
    jest.spyOn(prisma.game, 'findMany').mockResolvedValue([game]);

    expect(await service.findAllForGameMaster(id)).toEqual([game]);
  });
});
