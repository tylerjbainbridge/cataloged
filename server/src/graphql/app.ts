require('dotenv').config();
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
const express = require('express');
import * as Nexus from 'nexus';
import { applyMiddleware } from 'graphql-middleware';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { join } from 'path';

import types from './types';
import { Context } from '../typescript/types';
import { photon } from '../data/photon';
import { GoogleService } from '../services/GoogleService';
import { getUserFromRequest } from '../helpers/auth';
import { getHostUrl } from '../helpers/request';
import { permissions } from './permissions';

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const schema = Nexus.makeSchema({
  types: [...types, nexusPrisma],
  plugins: [nexusPrisma],
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

app.use(morgan('tiny'));

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  introspection: true,
  playground: true,
  formatError: (err: any) => {
    console.error(err.originalError);
    return err;
  },
  context: async ({ req }: { req: any }) => ({
    photon,
    user: await getUserFromRequest(req),
    google: new GoogleService(getHostUrl(req)),
  }),
});

server.applyMiddleware({ app, path: '/' });

export default app;
