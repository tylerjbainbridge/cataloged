import { objectType } from 'nexus';

export const Label = objectType({
  name: 'Label',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.name();

    t.model.items({ pagination: true });
  },
});
