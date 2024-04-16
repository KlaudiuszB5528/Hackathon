import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';
import { FilesModule } from './files/files.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthModule', () => {
    const authModule = module.get<AuthModule>(AuthModule);
    expect(authModule).toBeDefined();
  });

  it('should have PrismaModule', () => {
    const prismaModule = module.get<PrismaModule>(PrismaModule);
    expect(prismaModule).toBeDefined();
  });

  it('should have TeamsModule', () => {
    const teamsModule = module.get<TeamsModule>(TeamsModule);
    expect(teamsModule).toBeDefined();
  });

  it('should have MembersModule', () => {
    const membersModule = module.get<MembersModule>(MembersModule);
    expect(membersModule).toBeDefined();
  });

  it('should have FilesModule', () => {
    const filesModule = module.get<FilesModule>(FilesModule);
    expect(filesModule).toBeDefined();
  });
});
