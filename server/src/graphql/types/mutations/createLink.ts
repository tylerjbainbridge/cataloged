import { extendType, stringArg } from 'nexus';
// @ts-ignore
import grabity from 'grabity';

import { Link } from '../entities/Link';

export const createLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createLink', {
      type: Link,
      args: {
        href: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const { title, description, image, favicon } = await grabity.grabIt(
          args.href,
        );

        const item = await ctx.photon.items.create({
          data: {},
        });

        const link = await ctx.photon.links.create({
          data: {
            href: args.href,
            notes: '',
            title,
            description,
            image,
            favicon,
            user: { connect: { id: ctx.user.id } },
            item: {
              create: { type: 'link', user: { connect: { id: ctx.user.id } } },
            },
          },
        });

        console.log(link);

        return link;
      },
    });
  },
});
