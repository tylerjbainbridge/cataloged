import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';

import * as serviceWorker from './serviceWorker';
import { GRAPHQL_ENDPOINT } from './config';
import { Router } from './Router';
import { Auth } from './components/Auth';
import { theme } from './ui/theme';
import { GlobalModalProvider } from './components/GlobalModal';

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

(async () => {
  // @ts-ignore
  await persistCache({
    cache,
    key: 'cataloged-cache',
    // @ts-ignore
    storage: window.localStorage,
  });

  const link = authLink.concat(createUploadLink({ uri: GRAPHQL_ENDPOINT }));

  const client = new ApolloClient({
    link,
    cache,
  });

  const appNode = (
    <ApolloProvider client={client}>
      <Auth>
        <GlobalModalProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </GlobalModalProvider>
      </Auth>
    </ApolloProvider>
  );

  ReactDOM.render(appNode, document.getElementById('root'));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
