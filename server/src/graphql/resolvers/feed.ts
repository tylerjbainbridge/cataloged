import { FieldResolver, arg } from 'nexus';
import _, { merge } from 'lodash';

import { paginationArgs, getFindManyOrderArgs } from '../types/helpers';
import { findManyCursor } from '../../helpers/prisma';
import { ItemType } from '../types/misc';
import { FilterQueryBuilder } from './helpers/FilterQueryBuilder';

export const feedArgs = {
  ...paginationArgs,
  type: ItemType,
  orderBy: getFindManyOrderArgs('Item'),
  filters: arg({ type: 'FilterInput', list: true }),
  // // @ts-ignore
  // where: getWhereArgs('Item'),
  // // @ts-ignore
};

export const feedResolver: FieldResolver<'Query', 'items'> = (_, args, ctx) => {
  const { where, filters, mode = 'AND', ...rest } = args;

  /**
    name
    operator
    value
    values
  */

  const findManyArgs = new FilterQueryBuilder({
    filters,
    user: ctx.user,
  }).getFindManyArgs();

  // console.log(JSON.stringify(findManyArgs, null, 4));

  // console.log('args', JSON.stringify(args, null, 4));
  // console.log('filter', JSON.stringify(filter, null, 4));

  return findManyCursor(
    _args =>
      ctx.prisma.item.findMany(
        merge({
          ..._args,
          ...findManyArgs,
        }),
      ),
    rest,
  );
};
