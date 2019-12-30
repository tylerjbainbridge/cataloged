import _ from 'lodash';
import { GraphQLUpload } from 'graphql-upload';
import { asNexusMethod } from 'nexus';
import fs from 'fs';
import path from 'path';

import { Query } from './types/Query';
import { Mutation } from './types/Mutation';

import * as misc from './types/misc';

const GraphQLUploadScalar = asNexusMethod(GraphQLUpload, 'upload');

const loadedTypes = _.flatten(
  ['entities', 'mutations']
    .map(name => path.join(__dirname, `types/${name}`))
    .map((dirPath: string) =>
      fs.readdirSync(dirPath).map((file: string) => {
        const [typeName] = file.split('.');
        const filePath = path.join(dirPath, file);
        const type = require(filePath)[typeName];

        if (!type)
          throw new Error(`No type ${typeName} exported from ${filePath}`);

        return type;
      }),
    ),
);

export default [
  Query,
  Mutation,
  GraphQLUploadScalar,
  ...loadedTypes,
  // Misc
  ...Object.values(misc),
];
