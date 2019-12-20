import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../types/entities/Item';

export const disconnectLabelFromItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('disconnectLabelFromItem', {
      type: Item,
      args: {
        itemId: stringArg({ required: true }),
        labelId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        console.log('hello!', args);

        return await ctx.photon.items.update({
          where: { id: args.itemId },
          data: {
            labels: {
              disconnect: { id: args.labelId },
            },
          },
        });
      },
    });
  },
});
