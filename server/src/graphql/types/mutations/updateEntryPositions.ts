import { extendType, stringArg, intArg, arg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';
import { CollectionService } from '../../../services/CollectionService';
import { CollectionEntry } from '@prisma/client';

export const updateEntryPositions = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateEntryPositions', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
        entries: arg({ type: 'CollectionEntryPositionInput', list: true }),
      },
      resolve: async (root, args, ctx) => {
        const [collection] = await ctx.prisma.collection.findMany({
          where: { id: args.collectionId, user: { id: ctx.user.id } },
          first: 1,
        });

        if (!collection) throw new Error('No collection with that ID');

        await CollectionService.updatePositions(
          args.collectionId,
          args.entries,
        );

        return collection;
      },
    });
  },
});
