import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  slots: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;
}
