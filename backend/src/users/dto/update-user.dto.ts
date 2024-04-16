import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';
import { Role } from '../enums/roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(Role)
  @ApiProperty()
  role: Role;
}
