import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from './entities/game.entity';

jest.mock('./games.service');

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('creates a game', async () => {
    const dto: CreateGameDto = {
      city: 'city',
      description: 'description',
      slots: 1,
      title: 'title',
      authorId: 1,
      promptResponse: 'promptResponse',
      theme: 'theme',
    };
    jest.spyOn(service, 'create').mockResolvedValue(new GameEntity());

    expect(await controller.create(dto)).toBeInstanceOf(GameEntity);
  });

  it('finds all games for a game master', async () => {
    jest
      .spyOn(service, 'findAllForGameMaster')
      .mockResolvedValue([new GameEntity()]);

    expect(await controller.findAllForGameMaster(1)).toHaveLength(1);
  });

  it('finds a game by ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(new GameEntity());

    expect(await controller.findOne(1)).toBeInstanceOf(GameEntity);
  });

  it('updates a game', async () => {
    const dto = new UpdateGameDto();
    jest.spyOn(service, 'update').mockResolvedValue(new GameEntity());

    expect(await controller.update(1, dto)).toBeInstanceOf(GameEntity);
  });

  it('deletes a game', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(new GameEntity());

    expect(await controller.remove(1)).toBeInstanceOf(GameEntity);
  });
});
