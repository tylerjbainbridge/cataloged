import app from './graphql/app';

process.on('unhandledRejection', async (...args) => {
  console.log('ERROR', ...args);
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Primary API ready at http://localhost:5000`),
);
