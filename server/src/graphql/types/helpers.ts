import { stringArg, intArg } from 'nexus';
import { isEmpty } from 'lodash';

export const paginationArgs = {
  skip: intArg(),
  after: stringArg(),
  before: stringArg(),
  first: intArg(),
  last: intArg(),
};

export const getWhereArgs = (name: string) => `${name}WhereInput`;

export const getFindManyOrderArgs = (name: string) => `${name}OrderByInput`;

export const conditionallyAddKey = (argVal: any, objKey: string) =>
  isEmpty(argVal) ? { [objKey]: argVal } : {};
