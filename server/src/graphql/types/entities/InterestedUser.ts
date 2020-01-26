import { objectType } from 'nexus';

export const InterestedUser = objectType({
  name: 'InterestedUser',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.email();
  },
});
