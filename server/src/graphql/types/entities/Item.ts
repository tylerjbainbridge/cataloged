import { objectType } from 'nexus';

import { ITEM_STATUS } from '../misc';

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.id();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.date();

    t.model.isFavorited();

    t.field('status', {
      type: 'ItemStatus',
      // @ts-ignore
      resolve: ({ status }) => status || ITEM_STATUS.NOT_STARTED.toString(),
    });

    t.model.file();
    t.model.link();
    t.model.note();
    t.model.googleContact();

    t.model.labels({ ordering: true });

    t.model.type();
  },
});
