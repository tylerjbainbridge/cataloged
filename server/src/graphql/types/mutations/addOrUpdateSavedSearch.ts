import { extendType, stringArg, arg } from 'nexus';
import _ from 'lodash';

import { SavedSearch } from '../entities/SavedSearch';

const CURRENT_VERSION = 1;

export const addOrUpdateSavedSearch = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addOrUpdateSavedSearch', {
      type: SavedSearch,
      args: {
        savedSearchId: stringArg(),
        name: stringArg({ required: true }),
        filters: arg({ type: 'FilterInput', list: true, required: true }),
      },
      resolve: async (root, args, ctx) => {
        let savedSearch: any = null;

        if (!args.savedSearchId) {
          savedSearch = await ctx.photon.savedSearches.create({
            data: {
              name: args.name,
              version: CURRENT_VERSION,
              user: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          });
        } else {
          savedSearch = await ctx.photon.savedSearches.update({
            where: { id: args.savedSearchId },
            data: {
              name: args.name,
            },
          });
        }

        await ctx.photon.savedSearchFilters.deleteMany({
          where: {
            savedSearch: {
              id: savedSearch.id,
            },
          },
        });

        await Promise.all(
          (args.filters || []).map(
            async ({ name, operator, value, values }: any) => {
              await ctx.photon.savedSearchFilters.create({
                data: {
                  name,
                  operator,
                  value,
                  ...(values ? { values: JSON.stringify(values) } : {}),
                  savedSearch: {
                    connect: { id: savedSearch.id },
                  },
                  user: {
                    connect: {
                      id: ctx.user.id,
                    },
                  },
                },
              });
            },
          ),
        );

        return savedSearch;
      },
    });
  },
});
