import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

/**
 * This janky code is for re-writing the .env variables in a way that dotenv can understand.
 */
if (process.env.NODE_ENV === 'development') {
  const ENV_PATH = path.join(
    __dirname,
    true ? '../../../.env.production.local' : '../../../.env',
  );

  const env = readFileSync(ENV_PATH)
    .toString()
    .split('export ')
    .join('');

  writeFileSync(path.join(__dirname, '../../.env'), env);
}

require('dotenv').config();

import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
import { default as express } from 'express';
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
import { Sentry } from '../config';

const schema = Nexus.makeSchema({
  types: [...types],
  typegenAutoConfig: {
    // @ts-ignore
    // contextType: Context,
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

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

app.use(morgan('tiny'));

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  introspection: process.env.NODE_ENV !== 'production',
  playground: true,
  formatError: (err: any) => {
    Sentry.captureException(err);

    console.error(err.originalError);
    return err;
  },
  context: async ({ req }: { req: any }): Promise<Context> => {
    const user = await getUserFromRequest(req);

    if (user) {
      Sentry.configureScope(scope => {
        scope.setUser({
          id: user.id,
          email: user.email,
        });
      });
    }

    return {
      prisma,
      user,
      google: new GoogleService(getHostUrl(req)),
    };
  },
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
