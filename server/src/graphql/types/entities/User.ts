import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.email();

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

    t.model.labels();
  },
});
