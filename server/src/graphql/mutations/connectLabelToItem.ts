import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../types/entities/Item';

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
        const [label] = await ctx.photon.labels.findMany({
          first: 1,
          where: { name: args.name },
        });

        const connectArgs = {
          items: { connect: { id: args.itemId } },
          user: { connect: { id: ctx.user.id } },
        };

        if (!label) {
          await ctx.photon.labels.create({
            data: { name: args.name, ...connectArgs },
          });
        } else {
          await ctx.photon.labels.update({
            where: { id: label.id },
            data: connectArgs,
          });
        }

        return await ctx.photon.items.findOne({
          where: { id: args.itemId },
        });
      },
    });
  },
});
