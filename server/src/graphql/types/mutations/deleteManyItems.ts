import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';

export const deleteManyItems = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('deleteManyItems', {
      type: Item,
      args: {
        itemIds: stringArg({ required: true, list: true }),
      },
      resolve: async (root, args, ctx) => {
        const items = await ItemService.deleteMany(args.itemIds);

        return items;
      },
    });
  },
});
