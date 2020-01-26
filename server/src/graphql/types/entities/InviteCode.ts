import { objectType } from 'nexus';

export const InviteCode = objectType({
  name: 'InviteCode',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.code();
  },
});
