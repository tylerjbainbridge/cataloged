import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';

export const addCollection = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addCollection', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
        name: stringArg({ required: true }),
        description: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.collection.create({
          data: {
            id: args.collectionId,
            name: args.name,
            description: args.description,
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
      },
    });
  },
});
