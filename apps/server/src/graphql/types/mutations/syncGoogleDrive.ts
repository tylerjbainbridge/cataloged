import { extendType, stringArg, booleanArg } from 'nexus';

import { JWT } from '../entities/JWT';
import { TokenService } from '../../../services/TokenService';
import { User } from '@prisma/client';
import { SyncGoogleDrive } from '../../../queues/SyncGoogleDrive';

export const syncGoogleDrive = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('syncGoogleDrive', {
      type: 'String',
      args: {
        googleAccountId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const googleAccount = await ctx.prisma.googleAccount.findOne({
          where: { id: args.googleAccountId },
        });

        SyncGoogleDrive.add({ googleAccount, user: ctx.user });

        return 'Started...';
      },
    });
  },
});
