import { extendType, stringArg, inputObjectType } from 'nexus';
import _ from 'lodash';

import { Item } from '../entities/Item';
import Bluebird from 'bluebird';
import { ItemService } from '../../../services/ItemService';

export const batchUpdateItemCollections = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('batchUpdateItemCollections', {
      type: Item,
      args: {
        itemIds: stringArg({ required: true, list: true }),
        collectionIdsToAdd: stringArg({ required: true, list: true }),
        collectionIdsToRemove: stringArg({ required: true, list: true }),
      },
      resolve: async (root, args, ctx) => {
        const items = await ctx.prisma.item.findMany({
          where: { id: { in: args.itemIds } },
          include: {
            collections: true,
          },
        });

        // const collectionIdsToConnect = [...args.collectionIdsToAdd];

        await Bluebird.map(items, async (item: any) => {
          // Add if applicable
          await Bluebird.map(
            args.collectionIdsToAdd,
            async (collectionId: string) => {
              // If this item doesnt have this collection yet.
              if (
                !item.collections.find(
                  (collection: any) => collection.id === collectionId,
                )
              ) {
                await ItemService.addToCollection(
                  ctx.user.id,
                  item.id,
                  collectionId,
                );
              }
            },
          );

          // Disconnect if applicable
          await Bluebird.map(
            item.collections || [],
            async (collection: any) => {
              if (
                args.collectionIdsToRemove.find(
                  (id: string) => id === collection.id,
                )
              ) {
                await ItemService.removeFromCollection(
                  ctx.user.id,
                  item.id,
                  collection.id,
                );
              }
            },
          );
        });

        return await ctx.prisma.item.findMany({
          where: { id: { in: args.itemIds } },
          include: {
            collections: true,
          },
        });
      },
    });
  },
});
