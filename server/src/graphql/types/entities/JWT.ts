import { objectType } from '@prisma/nexus';

export const JWT = objectType({
  name: 'JWT',
  definition(t) {
    t.string('token');
  },
});
