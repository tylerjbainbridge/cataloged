import { stringArg, intArg, arg } from '@prisma/nexus';

export const paginationArgs = {
  skip: intArg(),
  after: stringArg(),
  before: stringArg(),
  first: intArg(),
  last: intArg(),
};

export const getFindManyWhereArgs = (name: string) =>
  `QueryFindMany${name}WhereInput`;

export const getFindManyOrderArgs = (name: string) =>
  `QueryFindMany${name}OrderByInput`;

export const conditionallyAddKey = (argVal: any, objKey: string) =>
  argVal ? { [objKey]: argVal } : {};
