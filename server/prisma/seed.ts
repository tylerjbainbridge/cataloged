import { Photon } from '@prisma/photon';
const photon = new Photon();

async function main() {
  const user1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      files: {
        create: {
          name: 'test',
          extension: 'jpg',
        },
      },
    },
  });
  const user2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      files: {
        create: [
          {
            name: 'test-2',
            extension: 'jpg',
          },
          {
            name: 'test-3',
            extension: 'jpeg',
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
