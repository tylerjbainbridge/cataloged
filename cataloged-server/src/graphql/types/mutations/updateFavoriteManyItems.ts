import { extendType, stringArg, booleanArg, arg } from 'nexus';
import _ from 'lodash';
import { Item } from '../entities/Item';

export const updateFavoriteManyItems = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('updateFavoriteManyItems', {
      type: Item,
      args: {
        itemIds: stringArg({ required: true, list: true }),
        isFavorited: booleanArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await ctx.prisma.item.updateMany({
          where: { id: { in: args.itemIds } },
          data: { isFavorited: args.isFavorited },
        });

        return await ctx.prisma.item.findMany({
          where: { id: { in: args.itemIds } },
        });
      },
    });
  },
});
