require('dotenv').config();
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
const express = require('express');
import * as Nexus from 'nexus';
import { applyMiddleware } from 'graphql-middleware';
import { nexusPrismaPlugin } from 'nexus-prisma';

import types from './types';
import { photon } from '../data/photon';
import { GoogleService } from '../services/GoogleService';
import { getUserFromRequest } from '../helpers/auth';
import { getHostUrl } from '../helpers/request';
import { permissions } from './permissions';

const schema = Nexus.makeSchema({
  types: [...types],
  plugins: [
    nexusPrismaPlugin({
      inputs: {
        photon: '@prisma/photon',
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
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
