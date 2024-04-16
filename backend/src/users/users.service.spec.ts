import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Role } from './enums/roles';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('creates a user with hashed password', async () => {
    const dto = new CreateUserDto();
    dto.password = 'password';
    const user = {
      id: 1,
      role: 'user',
      username: 'username',
      password: dto.password,
    };
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);

    const result = await service.create(dto);
    expect(result).toEqual(user);
  });

  it('finds a user by ID', async () => {
    const id = 1;
    const user = {
      id,
      role: 'user',
      username: 'username',
      password: 'password',
    };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    const result = await service.findOne(id);
    expect(result).toEqual(user);
  });

  it('updates a user with hashed password', async () => {
    const id = 1;
    const dto = new UpdateUserDto();
    dto.password = 'newPassword';
    const user = {
      id,
      role: 'user',
      username: 'username',
      password: dto.password,
    };
    const hashedPassword = dto.password;
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(user);

    const result = await service.update(id, dto);
    expect(result).toEqual(user);
  });

  it('deletes a user', async () => {
    const id = 1;
    const user = {
      id,
      role: 'user',
      username: 'username',
      password: 'password',
    };
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(user);

    const result = await service.remove(id);
    expect(result).toEqual(user);
  });

  it('updates a user role', async () => {
    const id = 1;
    const dto = new UpdateUserRoleDto();
    dto.role = Role.ADMIN;
    const user = {
      id,
      role: dto.role,
      username: 'username',
      password: 'password',
    };
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(user);

    const result = await service.updateRole(id, dto);
    expect(result).toEqual(user);
  });

  it('finds all non-admin users', async () => {
    const users = [
      { id: 1, role: 'user', username: 'username', password: 'password' },
      { id: 2, role: 'user', username: 'username', password: 'password' },
    ];
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    const result = await service.findAllUsers();
    expect(result).toEqual(users);
  });
});
