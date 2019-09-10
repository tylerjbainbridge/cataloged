import { GraphQLUpload } from 'graphql-upload';
import { asNexusMethod } from '@prisma/nexus';

import { Query } from './types/Query';
import { Mutation } from './types/Mutation';
import { User } from './types/entities/User';
import { File } from './types/entities/File';
import { Item } from './types/entities/Item';
import { Link } from './types/entities/Link';
import { Label } from './types/entities/Label';
import { UploadGroup } from './types/entities/UploadGroup';

import { googleSignIn } from './mutations/googleSignIn';
import { createFiles, KeyBlob } from './mutations/createFiles';
import { createLink } from './mutations/createLink';

const GraphQLUploadScalar = asNexusMethod(GraphQLUpload, 'upload');

// const entitiesPath = path.join(__dirname, 'types/entities');
// const mutationsPath = path.join(__dirname, 'mutations');

// const dirLoader = (dirPath: string) =>
//   fs.readdirSync(dirPath).map(function(file: string) {
//     const [typeName] = file.split('.');
//     const filePath = path.join(dirPath, file);
//     const type = require(filePath)[typeName];

//     if (!type) throw new Error(`No type ${typeName} exported from ${filePath}`);

//     return type;
//   });

// const entities = dirLoader(entitiesPath);
// const mutations = dirLoader(mutationsPath);

export default [
  // Root types
  Query,
  Mutation,
  // Entity types
  User,
  File,
  Item,
  UploadGroup,
  Link,
  Label,
  // Scalars
  GraphQLUploadScalar,
  GraphQLUpload,
  // Input
  KeyBlob,
  // Mutations
  googleSignIn,
  createFiles,
  createLink,
];
