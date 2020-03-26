import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { Collection } from '../entities/Collection';
import { CollectionService } from '../../../services/CollectionService';

export const deleteCollection = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteCollection', {
      type: Collection,
      args: {
        collectionId: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        await CollectionService.deleteCollection(
          args.collectionId,
          ctx.user.id,
        );

        return {
          id: args.collectionId,
        };
      },
    });
  },
});
