import { inputObjectType } from '@prisma/nexus';

export const SignedURLArgs = inputObjectType({
  name: 'SignedURLArgs',
  definition(t) {
    t.string('key', { required: true });
    t.string('type', { required: true });
  },
});
