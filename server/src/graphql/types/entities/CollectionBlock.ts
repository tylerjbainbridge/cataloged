import { objectType } from 'nexus';

export const CollectionBlock = objectType({
  name: 'CollectionBlock',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.type();
    t.model.content();

    t.model.collection({} as any);
  },
});
