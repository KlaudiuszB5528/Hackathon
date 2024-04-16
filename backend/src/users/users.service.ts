import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Role } from './enums/roles';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  updateRole(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prismaService.user.update({
      where: { id },
      data: { role: updateUserRoleDto.role },
    });
  }

  findAllUsers() {
    return this.prismaService.user.findMany({
      where: { NOT: { role: Role.ADMIN } },
    });
  }
}
