import { ApiProperty } from '@nestjs/swagger';
import { File } from '@prisma/client';
import { GameEntity } from '../../games/entities/game.entity';

export class FileEntity implements File {
  @ApiProperty()
  id: number;
  @ApiProperty()
  size: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  game?: GameEntity;
}
