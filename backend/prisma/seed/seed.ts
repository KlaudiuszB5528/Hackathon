import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../../src/users/enums/roles';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Test123$', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      password: password,
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      username: 'master',
      password: password,
      role: Role.MASTER_USER,
    },
  });

  await prisma.user.create({
    data: {
      username: 'user',
      password: password,
      role: Role.USER,
    },
  });

  await prisma.game.create({
    data: {
      title: 'Game 1',
      authorId: 2,
      description: 'Description of Game 1',
      city: 'City 1',
      slots: 5,
      promptResponse: 'Prompt Response 1',
      theme: 'Theme 1',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
