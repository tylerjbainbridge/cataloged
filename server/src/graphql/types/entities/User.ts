import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.email();

    t.model.inviteCode();
    t.model.isActive();

    t.model.role();

    t.string(
      'fullName',
      ({ firstName, lastName }) => `${firstName} ${lastName}`,
    );

    t.model.files({
      pagination: true,
    });

    t.model.items({
      pagination: true,
    });

    t.model.googleAccounts({
      pagination: false,
    });

    t.model.labels({ ordering: true });

    t.model.collections({} as any);
  },
});
