import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserEntity } from './entities/user.entity';
import { Role } from './enums/roles';
import { firstValueFrom } from 'rxjs';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('creates a user', async () => {
    const dto = new CreateUserDto();
    const user = { id: 1, role: Role.USER, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(user);

    const result = await firstValueFrom(controller.create(dto));
    expect(result).toEqual(new UserEntity(user));
  });

  it('finds all users', async () => {
    const user = {
      id: 1,
      role: Role.USER,
      username: 'username',
      password: 'password',
    };
    jest.spyOn(service, 'findAllUsers').mockResolvedValue([user]);

    const result = await firstValueFrom(controller.findAllUser());
    expect(result).toEqual([new UserEntity(user)]);
  });

  it('finds a user by ID', async () => {
    const id = 1;
    const user = {
      id,
      role: Role.USER,
      username: 'username',
      password: 'password',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    const result = await firstValueFrom(controller.findOne(id));
    expect(result).toEqual(new UserEntity(user));
  });

  it('updates a user', async () => {
    const id = 1;
    const dto = new UpdateUserDto();
    const user = {
      id,
      role: Role.USER,
      username: 'username',
      password: 'password',
      ...dto,
    };
    jest.spyOn(service, 'update').mockResolvedValue(user);

    const result = await firstValueFrom(controller.update(id, dto));
    expect(result).toEqual(new UserEntity(user));
  });

  it('updates a user role', async () => {
    const id = 1;
    const dto = new UpdateUserRoleDto();
    const user = {
      id,
      role: dto.role,
      username: 'username',
      password: 'password',
    };
    jest.spyOn(service, 'updateRole').mockResolvedValue(user);

    const result = await firstValueFrom(controller.updateRole(id, dto));
    expect(result).toEqual(new UserEntity(user));
  });

  it('deletes a user', async () => {
    const id = 1;
    const user = {
      id,
      role: Role.USER,
      username: 'username',
      password: 'password',
    };
    jest.spyOn(service, 'remove').mockResolvedValue(user);

    const result = await firstValueFrom(controller.remove(id));
    expect(result).toEqual(new UserEntity(user));
  });
});
