import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';
import { prisma } from '../../../data/photon';

export const connectItemToItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('connectItemToItem', {
      type: Item,
      args: {
        itemOneId: stringArg({ required: true }),
        itemTwoId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await prisma.item.update({
          where: { id: args.itemOneId },
          data: {
            items: { disconnect: { id: args.itemTwoId } },
          },
        });

        return await prisma.item.findMany({
          where: { id: { in: [args.itemOneId, args.itemTwoId] } },
        });
      },
    });
  },
});
