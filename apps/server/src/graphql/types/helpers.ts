import { stringArg, intArg, objectType } from 'nexus';
import { isEmpty } from 'lodash';

export const paginationArgs = {
  first: intArg({
    required: false,
  }),
  last: intArg({
    required: false,
  }),
  after: stringArg({
    required: false,
  }),
  before: stringArg({
    required: false,
  }),
};

export const getWhereArgs = (name: string) => `${name}WhereInput`;

export const getFindManyOrderArgs = (name: string) => `${name}OrderByInput`;

export const conditionallyAddKey = (argVal: any, objKey: string) =>
  isEmpty(argVal) ? { [objKey]: argVal } : {};

export const getConnectionTypesFromName = (Name: string) => {
  const ConnectionName = `${Name}Connection`;
  const EdgeName = `${Name}Edge`;

  return [
    objectType({
      name: ConnectionName,
      definition(t) {
        t.field('pageInfo', {
          type: 'PageInfo',
        });
        t.list.field('edges', {
          type: EdgeName,
        });
      },
    }),
    objectType({
      name: EdgeName,
      definition(t) {
        t.string('cursor');
        t.field('node', { type: 'Item' });
      },
    }),
  ];
};
