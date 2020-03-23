import { objectType } from 'nexus';

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.name();
    t.model.description();

    t.model.entries({ ordering: { position: true } } as any);

    t.model.items();
  },
});
