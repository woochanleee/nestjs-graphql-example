import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'test',
      name: 'Lisa Simpson',
      password: '$2b$10$8gFUIfYHpA1Phg5agbCdwu1w57Csp8RNPIXYVMqOjMYI2RzW/toii', // test
      role: 'USER',
      registeredAt: '2021-02-25T11:33:48.000Z',
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          createdAt: '2021-02-25T11:33:48.000Z',
          updatedAt: '2021-02-25T11:33:48.000Z',
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      name: 'Bart Simpson',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      registeredAt: '2021-02-25T11:33:48.000Z',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            createdAt: '2021-02-25T11:33:48.000Z',
            updatedAt: '2021-02-25T11:33:48.000Z',
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            createdAt: '2021-02-25T11:33:48.000Z',
            updatedAt: '2021-02-25T11:33:48.000Z',
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
