import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [PrismaModule],
  exports: [GamesService],
})
export class GamesModule {}
