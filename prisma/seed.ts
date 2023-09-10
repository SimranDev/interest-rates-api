import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await clearDatabase();

  const anz = await prisma.lender.create({
    data: {
      name: 'ANZ',
    },
  });
  const asb = await prisma.lender.create({
    data: {
      name: 'ASB',
    },
  });
  const westpac = await prisma.lender.create({
    data: {
      name: 'Westpac',
    },
  });

  await prisma.lenderInterestRate.createMany({
    data: [
      {
        lenderId: anz.id,
        rate: '3.5',
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
      },
      {
        lenderId: anz.id,
        rate: '3.6',
        createdAt: new Date('2023-01-02T00:00:00.000Z'),
      },
      {
        lenderId: asb.id,
        rate: '2.8',
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
      },
      {
        lenderId: asb.id,
        rate: '2.9',
        createdAt: new Date('2023-01-02T00:00:00.000Z'),
      },
      {
        lenderId: westpac.id,
        rate: '1.9',
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
      },
      {
        lenderId: westpac.id,
        rate: '2.0',
        createdAt: new Date('2023-01-02T00:00:00.000Z'),
      },
    ],
  });
}

async function clearDatabase() {
  await prisma.lenderInterestRate.deleteMany();
  await prisma.lender.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
