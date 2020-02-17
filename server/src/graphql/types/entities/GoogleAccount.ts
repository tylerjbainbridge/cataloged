import { objectType } from 'nexus';

export const GoogleAccount = objectType({
  name: 'GoogleAccount',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.email();
  },
});
