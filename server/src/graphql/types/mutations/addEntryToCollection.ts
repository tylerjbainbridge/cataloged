import { extendType, stringArg, arg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';
import { CollectionService } from '../../../services/CollectionService';
import { CollectionEntry } from '@prisma/client';

export const addEntryToCollection = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addEntryToCollection', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),

        entryInput: arg({
          type: 'NewCollectionEntryInput',
          required: true,
        }),
      },
      resolve: async (root, args, ctx) => {
        const collection = await ctx.prisma.collection.findOne({
          where: { id: args.collectionId },
        });

        if (!collection) throw new Error('No collection with that ID');

        const entry = {} as CollectionEntry;

        if (args.entryInput.itemId) {
          _.set(entry, 'item.connect.id', args.entryInput.itemId);

          await prisma.collection.update({
            where: { id: args.entryInput.itemId },
            data: {
              items: { connect: { id: args.entryInput.itemId } },
            },
          });
        } else if (args.entryInput.blockType) {
          const block = await ctx.prisma.collectionBlock.create({
            data: {
              id: args.entryInput.blockId,
              type: args.entryInput.blockType,
              content: args.entryInput.blockContent,
              collection: {
                connect: { id: collection.id },
              },
              user: {
                connect: { id: ctx.user.id },
              },
            },
          });

          _.set(entry, 'block.connect.id', block.id);
        }

        _.set(entry, 'position', args.entryInput.position || 0);
        _.set(entry, 'collection.connect.id', collection.id);
        _.set(entry, 'id', args.entryInput.entryId);

        await CollectionService.insertAtPosition(
          collection.id,
          ctx.user.id,
          entry,
        );

        return collection;
      },
    });
  },
});
