import { extendType, stringArg, inputObjectType } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import Bluebird from 'bluebird';
import { ItemService } from '../../../services/ItemService';

export const batchUpdateItemLabels = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('batchUpdateItemLabels', {
      type: Item,
      args: {
        itemIds: stringArg({ required: true, list: true }),
        labelIdsToAdd: stringArg({ required: true, list: true }),
        labelIdsToRemove: stringArg({ required: true, list: true }),
      },
      resolve: async (root, args, ctx) => {
        const items = await ctx.photon.items.findMany({
          where: { id: { in: args.itemIds } },
          include: {
            labels: true,
          },
        });

        await Bluebird.map(items, async (item: any) => {
          // Add if applicable
          await Bluebird.map(args.labelIdsToAdd, async (id: string) => {
            // If this item doesnt have this label yet.
            if (!item.labels.find((label: any) => label.id === id)) {
              await ItemService.connectLabel(item.id, id);
            }
          });

          // Disconnect if applicable
          await Bluebird.map(item.labels || [], async (label: any) => {
            if (args.labelIdsToRemove.find((id: string) => label.id === id)) {
              await ItemService.disconnectLabel(item.id, label.id);
            }
          });
        });

        return await ctx.photon.items.findMany({
          where: { id: { in: args.itemIds } },
          include: {
            labels: true,
          },
        });
      },
    });
  },
});
