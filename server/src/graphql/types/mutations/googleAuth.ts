import { extendType, stringArg, booleanArg } from 'nexus';

import { JWT } from '../entities/JWT';
import { TokenService } from '../../../services/TokenService';
import { User } from '@prisma/client';

export const googleAuth = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('googleAuth', {
      type: JWT,
      args: {
        code: stringArg({ required: true }),
        isAuthMethod: booleanArg(),
      },
      resolve: async (root, args, ctx) => {
        const { code, isAuthMethod = false } = args;

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
          account = await ctx.prisma.googleAccount.findOne({
            where: { accountId },
            include: { user: true },
          });
        } catch (e) {}

        // @ts-ignore
        let user: User | null = ctx.user;

        const data = {
          email,
          accountId,
          firstName,
          lastName,
          picture,
          isAuthMethod,
          expiresAt: new Date(tokens.expiry_date),
          refreshToken: tokens.refresh_token,
          accessToken: tokens.access_token,
        };

        if (!account) {
          if (!ctx.user) {
            user = await ctx.prisma.user.create({
              data: {
                email,
                firstName,
                lastName,
                googleAccounts: {
                  create: {
                    ...data,
                  },
                },
              },
            });
          }
        } else {
          user = account.user;

          await ctx.prisma.googleAccount.update({
            where: { accountId },
            data: {
              ...data,
            },
          });
        }

        return {
          token: TokenService.getTokenFromUser(user),
        };
      },
    });
  },
});
