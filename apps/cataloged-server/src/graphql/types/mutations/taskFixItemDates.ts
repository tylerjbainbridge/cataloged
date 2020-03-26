import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { Item } from '@prisma/client';

export const taskFixItemDates = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('taskFixItemDates', {
      type: 'String',
      resolve: async (root, args, ctx) => {
        const items = await ctx.prisma.item.findMany();

        await Bluebird.map(
          items,
          async (item: Item) =>
            await ctx.prisma.item.update({
              where: { id: item.id },
              data: { date: item.createdAt },
            }),
          { concurrency: 5 },
        );

        return `Updated ${items.length} items`;
      },
    });
  },
});
