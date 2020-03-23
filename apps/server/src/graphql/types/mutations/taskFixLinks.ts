import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { Link } from '@prisma/client';
import { getIsIframeDisabled, getMetadataFromUrl } from '../../../helpers/link';

export const taskFixLinks = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('taskFixLinks', {
      type: 'String',
      resolve: async (root, args, ctx) => {
        const links = await ctx.prisma.link.findMany();

        await Bluebird.map(
          links,
          async (link: Link) => {
            try {
              const {
                image,
                favicon,
                logo,
                isIframeDisabled,
              } = await getMetadataFromUrl(link.href);

              return await ctx.prisma.link.update({
                where: { id: link.id },
                data: {
                  image: image || link.image,
                  favicon: favicon || link.favicon,
                  logo: logo || link.logo,
                  isIframeDisabled,
                },
              });
            } catch (e) {
              console.log('failed for link', link);
              console.log(e);
            }
          },
          { concurrency: 10 },
        );

        return `Updated ${links.length} links`;
      },
    });
  },
});
