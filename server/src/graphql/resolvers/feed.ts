import { FieldResolver, stringArg, arg } from 'nexus';
import { merge, set, get } from 'lodash';

import {
  paginationArgs,
  getWhereArgs,
  getFindManyOrderArgs,
} from '../types/helpers';
import { findManyCursor } from '../../helpers/prisma';
import { ItemType } from '../types/misc';

export const feedArgs = {
  ...paginationArgs,
  type: ItemType,
  orderBy: getFindManyOrderArgs('Item'),
  filters: arg({ type: 'FilterInput', list: true }),
  // // @ts-ignore
  // where: getWhereArgs('Item'),
  // // @ts-ignore
};

export const STRING_FILTERS = {
  note: ['text'],
  file: ['name', 'extension'],
  link: ['href', 'title', 'description'],
};

const getTrueValue = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const feedResolver: FieldResolver<'Query', 'items'> = (_, args, ctx) => {
  const { where, filters, mode = 'AND', ...rest } = args;

  /**
    name
    operator
    value
    values
  */

  const filterConfig = {};

  const itemSpecificFilters = {
    note: {
      type: 'note',
    },

    link: {
      type: 'link',
    },

    file: {
      type: 'file',
      file: {
        isUploaded: true,
        hasStartedUploading: true,
      },
    },
  };

  const baseFilters: any[] = [];

  (filters || []).forEach(
    (filter: {
      name: string;
      operator: string;
      value?: string;
      values?: string[];
    }) => {
      switch (filter.name) {
        case 'status':
        case 'isFavorited':
        case 'type':
          // @ts-ignore
          baseFilters.push(
            set(
              {},
              `${filter.name}.${filter.operator}`,
              getTrueValue(filter.value),
            ),
          );

          break;

        case 'labels':
          // @ts-ignore
          baseFilters.push(
            set({}, `labels.${filter.operator}.name.in`, filter.values),
          );

          break;

        case 'search':
          const words = filter.value
            .split(' ')
            .map((word: string) => word.trim());

          Object.keys(itemSpecificFilters).forEach(type => {
            const existing = get(
              // @ts-ignore
              itemSpecificFilters[type],
              `${type}.OR`,
              [],
            );

            set(
              // @ts-ignore
              itemSpecificFilters[type],
              `${type}.OR`,
              [
                ...existing,
                ...words.reduce(
                  // @ts-ignore
                  (p, word) => [
                    ...p,
                    // @ts-ignore
                    ...STRING_FILTERS[type].map(field => ({
                      [field]: { [filter.operator]: word },
                    })),
                  ],
                  [],
                ),
              ],
            );
          });

          break;
      }
    },
  );

  const filter = merge(
    {
      where: {
        // @ts-ignore
        user: { id: ctx.user.id },
        [mode]: [{ OR: Object.values(itemSpecificFilters) }, ...baseFilters],
      },
    },
    filterConfig,
  );

  console.log('args', JSON.stringify(args, null, 4));
  console.log('filter', JSON.stringify(filter, null, 4));

  return findManyCursor(
    _args =>
      ctx.photon.items.findMany(
        merge({
          ..._args,
          ...filter,
        }),
      ),
    rest,
  );
};
