import { extendType, stringArg, intArg, arg } from 'nexus';
import _ from 'lodash';

import { CollectionBlock } from '../entities/CollectionBlock';

export const updateBlockContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateBlockContent', {
      type: CollectionBlock,
      args: {
        collectionId: stringArg({ required: true }),
        blockId: stringArg({ required: true }),
        content: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const [collection] = await ctx.prisma.collection.findMany({
          where: { id: args.collectionId, user: { id: ctx.user.id } },
          first: 1,
        });

        if (!collection) throw new Error('No collection with that ID');

        const block = await ctx.prisma.collectionBlock.update({
          where: {
            id: args.blockId,
          },
          data: {
            content: args.content,
          },
        });

        return block;
      },
    });
  },
});
