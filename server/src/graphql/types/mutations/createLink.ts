import { extendType, stringArg } from 'nexus';
import { Link } from '../entities/Link';
import { getMetadataFromUrl, getIsIframeDisabled } from '../../../helpers/link';

export const createLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createLink', {
      type: Link,
      args: {
        href: stringArg({ required: true }),
        // image: stringArg(),
        // title: stringArg({ required: true }),
        // description: stringArg(),
        // favicon: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const { title, description, image, favicon } = await getMetadataFromUrl(
          args.href,
        );

        const isIframeDisabled = await getIsIframeDisabled(args.href);

        let host = null;

        try {
          host = new URL(args.href)?.host;
        } catch (e) {}

        const link = await ctx.prisma.link.create({
          data: {
            href: args.href,
            host,
            notes: '',
            title,
            description,
            image,
            favicon,
            isIframeDisabled,
            user: { connect: { id: ctx.user.id } },
            item: {
              create: { type: 'link', user: { connect: { id: ctx.user.id } } },
            },
          },
        });

        return link;
      },
    });
  },
});
