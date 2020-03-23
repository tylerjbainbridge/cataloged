import { extendType, stringArg, booleanArg, arg } from 'nexus';
import _ from 'lodash';
import { Item } from '../entities/Item';

export const updateStatusManyItems = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('updateStatusManyItems', {
      type: Item,
      args: {
        itemIds: stringArg({ required: true, list: true }),
        status: arg({ type: 'ItemStatus', required: true }),
      },
      resolve: async (root, args, ctx) => {
        await ctx.prisma.item.updateMany({
          where: { id: { in: args.itemIds } },
          data: { status: args.status },
        });

        return await ctx.prisma.item.findMany({
          where: { id: { in: args.itemIds } },
        });
      },
    });
  },
});
