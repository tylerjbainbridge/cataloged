import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { User } from '../types/entities/User';

export const deleteLabel = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteLabel', {
      type: User,
      args: {
        labelId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await ctx.photon.labels.delete({
          where: { id: args.itemId },
        });

        return ctx.user;
      },
    });
  },
});
