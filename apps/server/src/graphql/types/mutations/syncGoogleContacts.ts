import { extendType, stringArg, booleanArg } from 'nexus';

import { JWT } from '../entities/JWT';
import { TokenService } from '../../../services/TokenService';
import { User } from '@prisma/client';
import { GoogleContactsService } from '../../../services/GoogleContactsService';

export const syncGoogleContacts = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('syncGoogleContacts', {
      type: 'Int',
      args: {
        googleAccountId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const googleAccount = await ctx.prisma.googleAccount.findOne({
          where: { id: args.googleAccountId },
        });

        const googleContactsService = new GoogleContactsService(
          ctx,
          googleAccount,
        );

        const connections = await googleContactsService.importGoogleContacts();

        console.log('connections', connections.length);

        return connections.length;
      },
    });
  },
});
