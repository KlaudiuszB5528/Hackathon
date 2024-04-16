import { Game } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GameEntity implements Game {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  author: UserEntity;

  @ApiProperty()
  city: string;

  @ApiProperty()
  gameRules: string;

  @ApiProperty()
  participants: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  promptResponse: string;

  @ApiProperty()
  theme: string;
}
