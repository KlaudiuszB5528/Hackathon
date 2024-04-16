import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'testToken'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login successfully with valid credentials', async () => {
    const loginDto: LoginAuthDto = { name: 'test', password: 'test' };
    const result = { accessToken: 'testToken' };

    jest.spyOn(service, 'login').mockImplementation(async () => result);

    expect(await controller.login(loginDto)).toBe(result);
  });

  it('should throw an error with invalid credentials', async () => {
    const loginDto: LoginAuthDto = { name: 'test', password: 'wrong' };

    jest.spyOn(service, 'login').mockImplementation(async () => {
      throw new Error('Invalid credentials');
    });

    await expect(controller.login(loginDto)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
