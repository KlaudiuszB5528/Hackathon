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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
