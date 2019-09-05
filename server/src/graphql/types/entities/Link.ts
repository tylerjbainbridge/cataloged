import { objectType } from '@prisma/nexus';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.href();
    t.model.notes();

    t.model.item();
  },
});
