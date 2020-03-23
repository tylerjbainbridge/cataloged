import { GraphQLUpload } from 'graphql-upload';
import { asNexusMethod } from 'nexus';

import * as types from './types/index';
import { getConnectionTypesFromName } from './types/helpers';

const GraphQLUploadScalar = asNexusMethod(GraphQLUpload, 'upload');

const ItemConnectionTypes = getConnectionTypesFromName('Item');

//@ts-ignore
export default [
  GraphQLUploadScalar,
  ...ItemConnectionTypes,
  ...Object.values(types),
];
