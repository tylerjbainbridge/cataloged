import { extendType, stringArg, arg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';
import { CollectionService } from '../../../services/CollectionService';
import { CollectionEntry } from '@prisma/client';

export const removeEntryFromCollection = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('removeEntryFromCollection', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
        entryId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const collection = await ctx.prisma.collection.findOne({
          where: { id: args.collectionId },
        });

        if (!collection) throw new Error('No collection with that ID');

        await CollectionService.removeEntry(
          collection.id,
          ctx.user.id,
          args.entryId,
        );

        return collection;
      },
    });
  },
});
