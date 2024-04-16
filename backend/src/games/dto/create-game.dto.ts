import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNumber()
  @Max(16)
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
