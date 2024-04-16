import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/role.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [AuthModule, PrismaModule, UsersModule],
})
export class AppModule {}
