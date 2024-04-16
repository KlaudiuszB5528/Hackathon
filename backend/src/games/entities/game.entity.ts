import { Game } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { FileEntity } from '../../files/entities/file.entity';
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
  description: string;

  @ApiProperty()
  slots: number;

  @ApiProperty()
  files: FileEntity[];

  @ApiProperty()
  title: string;
}
