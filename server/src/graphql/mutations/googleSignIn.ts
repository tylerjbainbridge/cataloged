import { extendType, stringArg } from 'nexus';

import { JWT } from '../types/entities/JWT';
import { TokenService } from '../../services/TokenService';
import { User } from '@generated/photon';

export const googleSignIn = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('googleSignIn', {
      type: JWT,
      args: {
        code: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const { code } = args;

        const {
          id: accountId,
          email,
          tokens,
        } = await ctx.google.getAccountFromCode(code);

        const {
          picture,
          given_name: firstName,
          family_name: lastName,
        } = await ctx.google.getUserInfo(tokens);

        let account;

        try {
          account = await ctx.photon.googleAccounts.findOne({
            where: { accountId },
            include: { user: true },
          });
        } catch (e) {}

        let user: User;

        if (!account) {
          user = await ctx.photon.users.create({
            data: {
              email,
              firstName,
              lastName,
              googleAccounts: {
                create: {
                  email,
                  accountId,
                  firstName,
                  lastName,
                  picture,
                  refreshToken: tokens.refresh_token,
                },
              },
            },
          });
        } else {
          user = account.user;
        }

        return {
          token: TokenService.getTokenFromUser(user),
        };
      },
    });
  },
});
