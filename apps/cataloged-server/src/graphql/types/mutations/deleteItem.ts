import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import { Item } from '../entities/Item';
import { ItemService } from '../../../services/ItemService';

export const deleteItem = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteItem', {
      type: Item,
      args: {
        itemId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const [item] = await ItemService.deleteMany([args.itemId]);

        return item;
      },
    });
  },
});
