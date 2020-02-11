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
          savedSearch = await ctx.prisma.savedSearch.create({
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
          savedSearch = await ctx.prisma.savedSearch.update({
            where: { id: args.savedSearchId },
            data: {
              name: args.name,
            },
          });
        }

        await ctx.prisma.savedSearchFilter.deleteMany({
          where: {
            savedSearch: {
              id: savedSearch.id,
            },
          },
        });

        await Promise.all(
          (args.filters || []).map(
            async ({ name, operator, value, values }: any) => {
              await ctx.prisma.savedSearchFilter.create({
                data: {
                  name,
                  operator,
                  value: value ? value.toString() : null,
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
