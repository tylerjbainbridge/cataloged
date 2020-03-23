import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { User } from '../entities/User';

export const deleteLabel = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteLabel', {
      type: User,
      args: {
        labelId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await ctx.prisma.label.delete({
          where: { id: args.labelId },
        });

        return ctx.user;
      },
    });
  },
});
