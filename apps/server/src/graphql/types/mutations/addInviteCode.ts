import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { InviteCode } from '../entities/InviteCode';

export const addInviteCode = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addInviteCode', {
      type: InviteCode,
      args: {
        code: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        if (ctx.user.role !== 'admin') return null;

        const [existing] = await ctx.prisma.inviteCode.findMany({
          where: args,
        });

        if (existing) return existing;

        return await ctx.prisma.inviteCode.create({
          data: args,
        });
      },
    });
  },
});
