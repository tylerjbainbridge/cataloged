import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import * as serviceWorker from './serviceWorker';
import { GRAPHQL_ENDPOINT } from './config';
import { Router } from './Router';
import { Auth } from './components/Auth';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
});

const link = authLink.concat(createUploadLink({ uri: GRAPHQL_ENDPOINT }));

const client = new ApolloClient({
  link,
  cache,
});

const appNode = (
  <ApolloProvider client={client}>
    <Auth>
      <Router />
    </Auth>
  </ApolloProvider>
);

ReactDOM.render(appNode, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
