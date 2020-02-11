import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { InterestedUser } from '../entities/InterestedUser';

export const addToWaitlist = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addToWaitlist', {
      type: InterestedUser,
      args: {
        email: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const [existing] = await ctx.prisma.interestedUser.findMany({
          where: { email: args.email },
        });

        if (existing) return existing;

        return await ctx.prisma.interestedUser.create({ data: args });
      },
    });
  },
});
