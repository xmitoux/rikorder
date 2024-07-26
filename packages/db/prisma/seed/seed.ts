import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // モードを全削除
  await prisma.rikordMode.deleteMany();

  await prisma.rikordMode.createMany({
    data: [
      { id: 1, modeName: 'View', monthlyGoal: 0 },
      { id: 2, modeName: 'Solo', monthlyGoal: 0 },
      { id: 3, modeName: 'Multi', monthlyGoal: 0 },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    throw new Error(error);
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .finally(() => {
    prisma.$disconnect();
  });
