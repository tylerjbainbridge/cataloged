import React from 'react';
import fetch from 'isomorphic-fetch';

import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://app.cataloged.co/graphql';

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  fetch,
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
