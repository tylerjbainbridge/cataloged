import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { Sentry } from './config';

/**
 * This janky code is for re-writing the .env variables in a way that dotenv can understand.
 */
if (process.env.NODE_ENV === 'development') {
  const ENV_PATH = path.join(
    __dirname,
    false ? '../../../.env.production.local' : '../../../.env',
  );

  const env = readFileSync(ENV_PATH)
    .toString()
    .split('export ')
    .join('');

  writeFileSync(path.join(__dirname, '../.env'), env);
}

require('dotenv').config();

import morgan from 'morgan';
import { default as express } from 'express';

import { prisma } from './data/photon';
import './queues';

const app = express();

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

app.use(morgan('tiny'));

app.get('/health-check', (req, res) => res.sendStatus(200));

app.get('/test-queue', (req, res) => {
  return res.sendStatus(200);
});

app.listen({ port: 7070 }, () =>
  console.log(`🚀 Worker server API ready at http://localhost:7070`),
);
