import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { User } from '../entities/User';

export const deleteItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteItem', {
      type: User,
      args: {
        itemId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const item = await ctx.photon.items.findOne({
          where: { id: args.itemId },
          include: {
            note: true,
            file: true,
            link: true,
            labels: true,
          },
        });

        const relations: { [k: string]: any } = {
          note: item.note,
          file: item.file,
          link: item.link,
        };

        await Promise.all(
          Object.keys(relations)
            .filter(key => relations[key])
            .map(key =>
              ctx.photon[`${key}s`].delete({
                where: { id: relations[key].id },
              }),
            ),
        );

        await Promise.all(
          item.labels.map((label: any) =>
            ctx.photon.labels.update({
              where: { id: label.id },
              data: {
                item: { disconnect: { id: item.id } },
              },
            }),
          ),
        );

        await ctx.photon.items.delete({
          where: { id: item.id },
        });

        return ctx.user;
      },
    });
  },
});
