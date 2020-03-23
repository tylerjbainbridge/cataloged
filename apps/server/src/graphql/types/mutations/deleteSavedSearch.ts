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
        await ctx.prisma.savedSearchFilter.deleteMany({
          where: {
            savedSearch: {
              id: args.id,
            },
          },
        });

        const savedSearch = await ctx.prisma.savedSearch.findOne({
          where: { id: args.id },
        });

        await ctx.prisma.savedSearch.delete({
          where: { id: args.id },
        });

        return savedSearch;
      },
    });
  },
});
