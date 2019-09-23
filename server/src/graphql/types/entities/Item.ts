import { objectType } from 'nexus';

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.file();
    t.model.link();

    t.model.type();
  },
});
