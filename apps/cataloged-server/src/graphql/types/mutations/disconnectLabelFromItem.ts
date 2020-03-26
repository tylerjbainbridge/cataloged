import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';

export const disconnectLabelFromItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('disconnectLabelFromItem', {
      type: Item,
      args: {
        itemId: stringArg({ required: true }),
        labelId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) =>
        ItemService.disconnectLabel(args.itemId, args.labelId),
    });
  },
});
