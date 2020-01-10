import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';

export const connectLabelToItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('connectLabelToItem', {
      type: Item,
      args: {
        name: stringArg({ required: true }),
        itemId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const item = await ItemService.connectOrCreateLabel(
          args.itemId,
          ctx.user.id,
          args.name,
        );

        return item;
      },
    });
  },
});
