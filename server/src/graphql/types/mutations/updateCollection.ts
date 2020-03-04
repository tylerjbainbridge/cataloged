import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';

export const updateCollection = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateCollection', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
        name: stringArg({ required: true }),
        description: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.collection.update({
          where: {
            id: args.collectionId,
          },
          data: {
            name: args.name,
            description: args.description,
          },
        });
      },
    });
  },
});
