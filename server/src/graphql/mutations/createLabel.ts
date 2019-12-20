import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Label } from '../types/entities/Label';

export const createLabel = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createLabel', {
      type: Label,
      args: {
        name: stringArg({ required: true }),
        itemId: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const data = { name };

        if (args.itemId) _.set(data, 'item.connect.id', args.itemId);

        const label = await ctx.photon.labels.create({
          data,
        });

        console.log(label);

        return label;
      },
    });
  },
});
