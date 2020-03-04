import { extendType, stringArg, intArg, arg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';
import { CollectionService } from '../../../services/CollectionService';
import { CollectionEntry } from '@prisma/client';

export const moveEntryToCollectionPosition = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('moveEntryToCollectionPosition', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
        entryId: stringArg(),
        position: intArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const collection = await ctx.prisma.collection.findOne({
          where: { id: args.collectionId },
        });

        if (!collection) throw new Error('No collection with that ID');

        const entry = await ctx.prisma.collectionEntry.findOne({
          where: { id: args.entryId },
        });

        if (!entry) throw new Error('No entry with that ID');

        await CollectionService.moveToPosition(
          collection.id,
          entry.id,
          args.position,
        );

        return collection;
      },
    });
  },
});
