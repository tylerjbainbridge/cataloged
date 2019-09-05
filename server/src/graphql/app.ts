require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { makeSchema } from '@prisma/nexus';
import { join } from 'path';

import types from './types';
import { Context } from '../typescript/types';
import { photon } from '../data/photon';
import { GoogleService } from '../services/GoogleService';
import { getUserFromRequest } from '../helpers/auth';
import { getHostUrl } from '../helpers/request';

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const schema = makeSchema({
  types: [...types, nexusPrisma],
  outputs: {
    typegen: join(__dirname, './generated/nexus-typegen.ts'),
    schema: join(__dirname, './generated/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, '../typescript/types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
});

const cleanup = async (exitCode: any) => {
  console.log({ exitCode });
  await photon.disconnect();
  process.exit();
};

process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2', cleanup);
process.on('uncaughtException', cleanup);

const app = express();

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: async ({ req }: { req: any }) => ({
    photon,
    user: await getUserFromRequest(req),
    google: new GoogleService(getHostUrl(req)),
  }),
  // middlewares: [permissions],
});

server.applyMiddleware({ app, path: '/' });

export default app;
