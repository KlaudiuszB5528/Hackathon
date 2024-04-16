import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../users/enums/roles';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('returns a token when login is successful', async () => {
    const user = {
      id: 1,
      username: 'username',
      password: 'password',
      role: Role.USER,
    };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
    const token = 'token';
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    const result = await service.login(user.username, user.password);
    expect(result).toEqual({ accessToken: token });
  });

  it('throws an error when password is invalid', async () => {
    const user = {
      id: 1,
      username: 'username',
      password: 'password',
      role: 'user',
    };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(false));

    await expect(service.login(user.username, 'wrongPassword')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
