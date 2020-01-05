import { FieldResolver, enumType, stringArg } from 'nexus';
import { merge, set } from 'lodash';

import {
  paginationArgs,
  getWhereArgs,
  getFindManyOrderArgs,
} from '../types/helpers';

const ITEM_TYPES = ['link', 'file', 'note'];

export const ItemType = enumType({
  name: 'ItemType',
  members: ITEM_TYPES,
});

export const feedArgs = {
  ...paginationArgs,
  search: stringArg(),
  type: ItemType,
  // @ts-ignore
  where: getWhereArgs('Item'),
  // @ts-ignore
  orderBy: getFindManyOrderArgs('Item'),
};

export const STRING_FILTERS = {
  note: ['text'],
  file: ['name', 'extension'],
  link: ['href', 'title', 'description'],
};

export const feedResolver: FieldResolver<'Query', 'items'> = (_, args, ctx) => {
  const { where, search = '', type, ...rest } = args;

  const { note: noteWhere, file: fileWhere, link: linkWhere } = where || {};

  const shouldInclude = (itemType: string) =>
    (type && type === itemType) || true;

  const itemFilters = {
    ...(shouldInclude('note')
      ? {
          note: {
            type: 'note',
            ...(noteWhere ? { note: noteWhere } : {}),
          },
        }
      : {}),

    ...(shouldInclude('link')
      ? {
          link: {
            type: 'link',
            ...(linkWhere ? { link: linkWhere } : {}),
          },
        }
      : {}),

    ...(shouldInclude('file')
      ? {
          file: {
            type: 'file',
            file: merge(fileWhere || {}, {
              isUploaded: true,
              hasStartedUploading: true,
            }),
          },
        }
      : {}),
  };

  if (search) {
    const words = search.split(' ').map((word: string) => word.trim());

    Object.keys(itemFilters).forEach(type => {
      set(
        // @ts-ignore
        itemFilters[type],
        `${type}.OR`,
        words.reduce(
          (p, word) => [
            ...p,
            // @ts-ignore
            ...STRING_FILTERS[type].map(field => ({
              [field]: { contains: word },
            })),
          ],
          [],
        ),
      );
    });
  }

  console.log(args);

  const params = {
    where: {
      // @ts-ignore
      user: { id: ctx.user.id },
      ...(type ? { type } : {}),
      ...(where || {}),
      OR: Object.values(itemFilters),
    },
    ...rest,
  };

  console.log({ params });

  return ctx.photon.items.findMany(params);
};