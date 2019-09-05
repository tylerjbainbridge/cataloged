import { extendType, stringArg } from '@prisma/nexus';
import { Link } from '../types/entities/Link';

export const createLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('createLink', {
      type: Link,
      args: {
        href: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const link = await ctx.photon.links.create({
          data: {
            href: args.href,
            notes: '',
            user: { connect: { id: ctx.user.id } },
            item: {
              create: {
                type: 'link',
                user: { connect: { id: ctx.user.id } },
              },
            },
          },
        });

        return link;
      },
    });
  },
});
