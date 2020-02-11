require('dotenv').config();
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
const express = require('express');
import * as Nexus from 'nexus';
import { applyMiddleware } from 'graphql-middleware';
import { nexusPrismaPlugin } from 'nexus-prisma';

import types from './types';
import { prisma } from '../data/photon';
import { GoogleService } from '../services/GoogleService';
import { getUserFromRequest } from '../helpers/auth';
import { getHostUrl } from '../helpers/request';
import { permissions } from './permissions';
import { Context } from '../typescript/types';

const schema = Nexus.makeSchema({
  types: [...types],
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '@prisma/client', alias: 'PrismaClient' }],
  },
  plugins: [
    nexusPrismaPlugin({
      prismaClient: ctx => ctx.prisma,
      inputs: { prismaClient: '@prisma/client' },
      // computedInputs: {
      //   user: ({ args, ctx, info }) => ({
      //     connect: {
      //       id: ctx.user?.id,
      //     },
      //   }),
      // },
    }),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
});

const app = express();

app.use(morgan('tiny'));
const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  introspection: process.env.NODE_ENV !== 'production',
  playground: true,
  formatError: (err: any) => {
    console.error(err.originalError);
    return err;
  },
  context: async ({ req }: { req: any }): Promise<Context> => ({
    prisma,
    user: await getUserFromRequest(req),
    google: new GoogleService(getHostUrl(req)),
  }),
});

server.applyMiddleware({ app, path: '/' });

const cleanup = async (exitCode: any) => {
  console.log({ exitCode });
  server.stop();
  process.exit();
};

process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2', cleanup);
process.on('uncaughtException', cleanup);

export default app;
