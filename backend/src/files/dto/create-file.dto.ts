import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  gameId: number;
}
