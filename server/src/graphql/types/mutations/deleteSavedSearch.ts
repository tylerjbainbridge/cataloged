import { extendType, stringArg, arg } from 'nexus';
import _ from 'lodash';

import { SavedSearch } from '../entities/SavedSearch';

export const deleteSavedSearch = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteSavedSearch', {
      type: SavedSearch,
      args: {
        id: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        await ctx.photon.savedSearchFilters.deleteMany({
          where: {
            savedSearch: {
              id: args.id,
            },
          },
        });

        const savedSearch = await ctx.photon.savedSearches.findOne({
          where: { id: args.id },
        });

        await ctx.photon.savedSearches.delete({
          where: { id: args.id },
        });

        return savedSearch;
      },
    });
  },
});
