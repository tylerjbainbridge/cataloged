import { extendType, inputObjectType, stringArg, arg } from '@prisma/nexus';

export const KeyType = inputObjectType({
  name: 'SignedURLArgs',
  definition(t) {
    t.string('key', { required: true });
    t.string('type', { required: true });
  },
});
