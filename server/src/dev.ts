import app from './graphql/app';
import { photon } from './data/photon';

process.on('unhandledRejection', async (...args) => {
  console.log(...args);
  await photon.disconnect();
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`),
);
