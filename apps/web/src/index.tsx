import { ApolloProvider } from '@apollo/client';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CSSReset,
  Stack,
  Text,
  ThemeProvider,
} from '@chakra-ui/core';
import * as Sentry from '@sentry/browser';
import { Auth } from 'cataloged-shared/components/Auth';
import { createApolloClient } from 'cataloged-shared/config/apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { GlobalModalProvider } from './components/GlobalModal';
import { Router } from './Router';
import * as serviceWorker from './serviceWorker';
import { theme } from './styles/theme';

Sentry.init({
  dsn: 'https://3cbc91c3ee1e456db2c87d85b24f197c@sentry.io/1553570',
});

// Electron
// @ts-ignore
if (window.interop) window.interop.setBadgeCount(9001);

(async () => {
  // @ts-ignore
  const client = await createApolloClient({ storage: window.localStorage });

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
                      <Button size="sm" onClick={window.location.reload}>
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

  const placeholder = (
    <ThemeProvider theme={theme}>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
      >
        <Stack spacing="15px">
          <Alert status="info">
            <AlertIcon />
            <AlertTitle mr={2}>
              <Text>
                Cataloged is undergoing maintenance...check back soon.
              </Text>
            </AlertTitle>
          </Alert>
          <Button size="sm" onClick={window.location.reload}>
            Try again
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );

  ReactDOM.render(
    process.env.SITE_STATUS === 'MAINTENANCE' ? placeholder : appNode,
    document.getElementById('root'),
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
