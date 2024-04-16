import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/roles';

export class UpdateUserRoleDto {
  @IsEnum(Role)
  @ApiProperty()
  role: Role;
}
