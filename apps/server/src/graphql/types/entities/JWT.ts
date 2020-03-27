import { objectType } from 'nexus';

export const JWT = objectType({
  name: 'JWT',
  definition(t) {
    t.string('token');
  },
});
