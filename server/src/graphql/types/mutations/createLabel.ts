import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { User } from '../entities/User';

export const createLabel = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createLabel', {
      type: User,
      args: {
        name: stringArg({ required: true }),
        itemId: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const data = { name: args.name };

        if (args.itemId) _.set(data, 'item.connect.id', args.itemId);
        _.set(data, 'user.connect.id', ctx.user.id);

        const [existingLabel] = await ctx.prisma.label.findMany({
          where: { name },
        });

        if (existingLabel) {
          await ctx.prisma.label.update({
            where: { id: existingLabel.id },
            data,
          });
        }

        await ctx.prisma.label.create({ data });

        return ctx.user;
      },
    });
  },
});
