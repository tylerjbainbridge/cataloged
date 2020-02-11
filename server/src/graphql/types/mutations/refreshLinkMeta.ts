import { extendType, stringArg } from 'nexus';
import { Link } from '../entities/Link';
import { getMetadataFromUrl } from '../../../helpers/link';

export const refreshLinkMeta = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('refreshLinkMeta', {
      type: Link,
      args: {
        linkId: stringArg({ required: true }),
        href: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const { title, description, image, favicon } = await getMetadataFromUrl(
          args.href,
        );

        await ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: {
            links: {
              update: {
                where: {
                  id: args.linkId,
                },
                data: { title, description, image, favicon },
              },
            },
          },
        });

        return await ctx.prisma.link.findOne({
          where: { id: args.linkId },
        });
      },
    });
  },
});
