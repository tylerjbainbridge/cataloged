import { GraphQLUpload } from 'graphql-upload';
import { asNexusMethod } from 'nexus';

import * as types from './types/index';

const GraphQLUploadScalar = asNexusMethod(GraphQLUpload, 'upload');

//@ts-ignore
export default [
  GraphQLUploadScalar,
  ...Object.values(types),
];
