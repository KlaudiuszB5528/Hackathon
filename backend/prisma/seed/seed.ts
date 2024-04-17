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

  const gameData = {
    title: 'Game',
    authorId: 2,
    gameRules:
      "Explore each point on the map, solve puzzles related to the city's history, and use the provided props to unravel the secrets of Kielce. Work together with your partner to decipher clues and complete challenges at each location. The team that successfully solves all puzzles and reaches the final destination first wins the game.",
    city: 'Kielce',
    participants: 2,
    promptResponse: JSON.stringify({
      city: 'Kielce',
      points: [
        {
          name: 'Kadzielnia',
          coordinates: '50.889675, 20.650518',
          puzzles: [
            'Solve the riddle engraved on the stone tablet',
            'Recreate a historical painting by identifying missing pieces',
            'Decipher a coded message hidden in the rocks',
          ],
          requiredProps: ['Torchlight', 'Magnifying glass'],
        },
        {
          name: 'Kielce Cathedral',
          coordinates: '50.864618, 20.636672',
          puzzles: [
            'Find and interpret ancient inscriptions on the walls',
            "Solve a jigsaw puzzle depicting the city's history",
            'Identify architectural elements on the cathedral',
          ],
          requiredProps: ['Notebook', 'Compass'],
        },
        {
          name: 'Sienkiewicza Street',
          coordinates: '50.866639, 20.627970',
          puzzles: [
            'Follow the trail of historical markers to uncover hidden clues',
            'Decode messages hidden in storefront displays',
            'Identify famous historical figures from statues along the street',
          ],
          requiredProps: ['Camera', 'Binoculars'],
        },
        {
          name: 'Palace of the Krakow Bishops',
          coordinates: '50.856197, 20.638456',
          puzzles: [
            'Match historical events with corresponding dates',
            "Locate hidden symbols in the palace's architecture",
            'Piece together fragments of historical documents',
          ],
          requiredProps: ['Map', 'Gloves'],
        },
      ],
      theme: 'Historical',
      participants: 2,
      gameRules:
        "Explore each point on the map, solve puzzles related to the city's history, and use the provided props to unravel the secrets of Kielce. Work together with your partner to decipher clues and complete challenges at each location. The team that successfully solves all puzzles and reaches the final destination first wins the game.",
    }),
    theme: 'Historical',
  };

  await prisma.game.create({ data: gameData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
