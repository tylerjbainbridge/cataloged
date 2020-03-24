import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/link-context';
import { persistCache } from 'apollo-cache-persist';

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://api.cataloged.co/';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

export const cache = new InMemoryCache({
  // @ts-ignore
  cacheRedirects: {
    Query: {
      // @ts-ignore
      book: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Item', id: args.id }),
    },
  },
});

export const createClient = async ({ storage }: { storage: any }) => {
  // @ts-ignore
  await persistCache({
    //@ts-ignore
    cache,
    key: 'cataloged-cache',
    // @ts-ignore
    storage,
  });

  // @ts-ignore
  const link = authLink.concat(createUploadLink({ uri: GRAPHQL_ENDPOINT }));

  const client = new ApolloClient({
    //@ts-ignore
    link,
    cache,
  });

  return client;
};
