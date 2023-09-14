import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await clearDatabase();

  const anz = await prisma.lender.create({
    data: {
      name: 'ANZ',
      identifier: 'anz',
    },
  });

  const asb = await prisma.lender.create({
    data: {
      name: 'ASB',
      identifier: 'asb',
    },
  });

  const westpac = await prisma.lender.create({
    data: {
      name: 'Westpac',
      identifier: 'westpac',
    },
  });

  await prisma.loanProduct.create({
    data: {
      name: 'ANZ Fixed Rate Home Loan',
      lenderId: anz.id,
      rates: {
        create: [
          {
            floating: 3.5,
            fixed12Months: 3.6,
            fixed24Months: 3.7,
            fixed36Months: 3.8,
            fixed48Months: 3.9,
            fixed60Months: 4.0,
          },
        ],
      },
    },
  });

  await prisma.loanProduct.create({
    data: {
      name: 'ANZ Variable Rate Home Loan',
      lenderId: anz.id,
      rates: {
        create: [
          {
            floating: 3.4,
            fixed12Months: 3.5,
            fixed24Months: 3.6,
            fixed36Months: 3.7,
            fixed48Months: 3.8,
            fixed60Months: 3.9,
          },
        ],
      },
    },
  });

  await prisma.loanProduct.create({
    data: {
      name: 'ASB Fixed Rate Home Loan',
      lenderId: asb.id,
      rates: {
        create: [
          {
            floating: 2.8,
            fixed12Months: 2.9,
            fixed24Months: 3.0,
            fixed36Months: 3.1,
            fixed48Months: 3.2,
            fixed60Months: 3.3,
          },
        ],
      },
    },
  });

  await prisma.loanProduct.create({
    data: {
      name: 'Westpac Fixed Rate Home Loan',
      lenderId: westpac.id,
      rates: {
        create: [
          {
            floating: 2.0,
            fixed12Months: 2.1,
            fixed24Months: 2.2,
            fixed36Months: 2.3,
            fixed48Months: 2.4,
            fixed60Months: 2.5,
          },
        ],
      },
    },
  });
}

async function clearDatabase() {
  await prisma.productRate.deleteMany();
  await prisma.loanProduct.deleteMany();
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
