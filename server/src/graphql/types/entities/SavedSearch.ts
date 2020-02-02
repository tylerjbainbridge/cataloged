import { objectType } from 'nexus';

export const SavedSearch = objectType({
  name: 'SavedSearch',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.name();
    t.model.version();

    t.list.field('filters', {
      type: 'Filter',
      // @ts-ignore
      resolve: async (parent, args, ctx) => {
        const rawSavedSearchFilters = await ctx.photon.savedSearchFilters.findMany(
          {
            where: {
              savedSearch: {
                id: parent.id,
              },
              user: { id: ctx.user.id },
            },
          },
        );

        return rawSavedSearchFilters.map(
          ({ name, operator, value, values }: any) => ({
            name,
            operator,
            value,
            ...(values ? { values: JSON.parse(values) } : {}),
          }),
        );
      },
    });
  },
});
