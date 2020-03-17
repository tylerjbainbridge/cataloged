import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/link-context';
import { persistCache } from 'apollo-cache-persist';
import {
  ThemeProvider,
  CSSReset,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Box,
} from '@chakra-ui/core';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import * as serviceWorker from '../../../shared/serviceWorker';
import { GRAPHQL_ENDPOINT } from '../../../shared/config';
import { Router } from '../../../shared/Router';
import { Auth } from '../../../shared/components/Auth';
import { theme } from '../../../shared/styles/theme';
import { GlobalModalProvider } from '../../../shared/components/GlobalModal';
import ErrorBoundary from 'react-error-boundary';

Sentry.init({
  dsn: 'https://3cbc91c3ee1e456db2c87d85b24f197c@sentry.io/1553570',
});

// Electron
// @ts-ignore
if (window.interop) window.interop.setBadgeCount(9001);

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
  // dataIdFromObject: o => o.id,
  // @ts-ignore
  cacheRedirects: {
    Query: {
      // @ts-ignore
      book: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Item', id: args.id }),
    },
  },
});

(async () => {
  // @ts-ignore
  await persistCache({
    //@ts-ignore
    cache,
    key: 'cataloged-cache',
    // @ts-ignore
    storage: window.localStorage,
  });

  // @ts-ignore
  const link = authLink.concat(createUploadLink({ uri: GRAPHQL_ENDPOINT }));

  const client = new ApolloClient({
    //@ts-ignore
    link,
    cache,
  });

  const appNode = (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Auth>
          <GlobalModalProvider>
            <ThemeProvider theme={theme}>
              <ErrorBoundary
                FallbackComponent={() => (
                  <Box
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100vw"
                    height="100vh"
                  >
                    <Stack spacing="15px">
                      <Alert>
                        <AlertIcon />
                        <AlertTitle mr={2}>Something went wrong!</AlertTitle>
                      </Alert>
                      <Button
                        size="sm"
                        onClick={() => window.location.replace('/')}
                      >
                        Try again
                      </Button>
                    </Stack>
                  </Box>
                )}
              >
                <CSSReset />
                <Router />
              </ErrorBoundary>
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
