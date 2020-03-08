import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { InterestedUser } from '../entities/InterestedUser';
import { EmailService } from '../../../services/EmailService';

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

        const interestedUser = await ctx.prisma.interestedUser.create({
          data: args,
        });

        const allInterestedUsers = await ctx.prisma.interestedUser.findMany();

        await EmailService.sendWailistConfirm({ to: args.email });

        await EmailService.sendEmail({
          to: args.email,
          text: `New user added to waitlist (${allInterestedUsers.length})! ${interestedUser.email}`,
        });

        return interestedUser;
      },
    });
  },
});
