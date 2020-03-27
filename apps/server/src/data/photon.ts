import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma
  .connect()
  .then(() => {
    console.log(`connected to prisma (${process.env.POSTGRESQL_URL})`);
  })
  .catch(e => {
    console.log(`error connecting to prisma (${process.env.POSTGRESQL_URL})`);
    process.exit();
  });
