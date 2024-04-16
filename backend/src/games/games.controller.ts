import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GameEntity } from './entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../users/enums/roles';

@Controller('games')
@ApiTags('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.MASTER_USER])
  @ApiCreatedResponse({
    type: GameEntity,
    description: 'The game has been successfully created.',
  })
  @ApiOperation({ summary: 'Create new game' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('game-master/:id')
  @UseGuards(JwtAuthGuard)
  @Roles([Role.MASTER_USER])
  @ApiOkResponse({
    type: [GameEntity],
    description: 'Get a games by game master ID',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a games by game master ID' })
  findAllForGameMaster(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findAllForGameMaster(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([Role.USER])
  @ApiOkResponse({
    type: [GameEntity],
    description: 'Get all games',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all games' })
  findAllForUser() {
    return this.gamesService.findAllForUser();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles([Role.MASTER_USER])
  @ApiOkResponse({
    type: [GameEntity],
    description: 'Get a game by ID',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a game ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles([Role.MASTER_USER])
  @ApiCreatedResponse({
    type: GameEntity,
    description: 'The record has been successfully updated.',
  })
  @ApiOperation({ summary: 'Update game by ID' })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles([Role.MASTER_USER])
  @ApiOkResponse({
    type: GameEntity,
    description: 'The record has been deleted',
  })
  @ApiOperation({ summary: 'Delete game' })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.remove(id);
  }
}
