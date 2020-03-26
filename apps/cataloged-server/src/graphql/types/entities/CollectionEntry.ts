import { objectType } from 'nexus';

export const CollectionEntry = objectType({
  name: 'CollectionEntry',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.position();

    t.model.item();
    t.model.block({} as any);

    t.model.collection({} as any);
  },
});
