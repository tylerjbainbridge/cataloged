import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';
import { prisma } from '../../../data/photon';

export const disconnectItemFromItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('disconnectItemFromItem', {
      type: Item,
      args: {
        itemOneId: stringArg({ required: true }),
        itemTwoId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await Promise.all(
          [
            [args.itemOneId, args.itemTwoId],
            [args.itemTwoId, args.itemOneId],
          ].map(async ([id, otherId]) => {
            try {
              await prisma.item.update({
                where: { id },
                data: {
                  items: { disconnect: { id: otherId } },
                },
              });
            } catch (e) {}
          }),
        );

        return await prisma.item.findMany({
          where: { id: { in: [args.itemOneId, args.itemTwoId] } },
        });
      },
    });
  },
});
