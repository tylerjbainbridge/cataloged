import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import * as serviceWorker from './serviceWorker';
import { GRAPHQL_ENDPOINT } from './config';
import { Router } from './Router';
import { Auth } from './components/Auth';
import { theme } from './ui/theme';
import { GlobalModalProvider } from './components/GlobalModal';

Sentry.init({
  dsn: 'https://3cbc91c3ee1e456db2c87d85b24f197c@sentry.io/1553570',
});

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
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Auth>
          <GlobalModalProvider>
            <ThemeProvider theme={theme}>
              <CSSReset />
              <Router />
            </ThemeProvider>
          </GlobalModalProvider>
        </Auth>
      </ApolloProvider>
    </BrowserRouter>
  );

  ReactDOM.render(appNode, document.getElementById('root'));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
