import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/link-context';
import { persistCache } from 'apollo-cache-persist';

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://api.cataloged.co/';

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

export const createApolloClient = async ({
  storage,
  getToken = () => localStorage.getItem('token'),
}: {
  storage: any;
  getToken: any;
}) => {
  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : '',
      },
    };
  });

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
