import { objectType } from 'nexus';

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.raw();
    t.model.text();

    t.model.item();
  },
});
