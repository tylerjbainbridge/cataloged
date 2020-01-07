import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Link } from '../entities/Link';

export const updateLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateLink', {
      type: Link,
      args: {
        linkId: stringArg({ required: true }),
        href: stringArg({ required: true }),
        title: stringArg({ required: true }),
        description: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const { linkId, ...newData } = args;

        await ctx.photon.users.update({
          where: { id: ctx.user.id },
          data: {
            links: {
              update: {
                where: {
                  id: linkId,
                },
                data: newData,
              },
            },
          },
        });

        return await ctx.photon.links.findOne({
          where: { id: linkId },
        });
      },
    });
  },
});
