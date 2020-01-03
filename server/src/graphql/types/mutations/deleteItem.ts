import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';

import { Item } from '../entities/Item';

export const deleteItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteItem', {
      type: Item,
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

        await Bluebird.map(
          Object.keys(relations).filter(key => relations[key]),
          (key: string) =>
            ctx.photon[`${key}s`].delete({
              where: { id: relations[key].id },
            }),
          { concurrency: 1 },
        );

        await Bluebird.map(
          item.labels,
          (label: any) =>
            ctx.photon.labels.update({
              where: { id: label.id },
              data: {
                items: { disconnect: { id: item.id } },
              },
            }),
          { concurrency: 1 },
        );

        await ctx.photon.items.delete({
          where: { id: item.id },
        });

        console.log(item);

        return item;
      },
    });
  },
});
