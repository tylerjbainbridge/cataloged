import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { User } from '../entities/User';

export const enterInviteCode = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('enterInviteCode', {
      type: User,
      args: {
        code: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const [code] = await ctx.prisma.inviteCode.findMany({
          where: args,
        });

        if (!code) throw new Error('Invalid code');

        return await ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: {
            isActive: true,
            inviteCode: {
              connect: {
                id: code.id,
              },
            },
          },
        });
      },
    });
  },
});
