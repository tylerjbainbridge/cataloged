import React, { useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import {
  Box,
  Spinner,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
} from '@chakra-ui/core';

import { GET_GOOGLE_URL } from './SignIn';
import { getGoogleUrl } from 'cataloged-shared/graphql/__generated__/getGoogleUrl';

export const ForceSignIn = () => {
  const client = useApolloClient();

  const { data, error } = useQuery<getGoogleUrl>(GET_GOOGLE_URL, {
    variables: {
      origin: '/',
      isAuthMethod: true,
    },
  });

  useEffect(() => {
    if (data) {
      window.location.replace(data.googleURL);
    }
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      {error ? (
        <Stack spacing="15px">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>
              Something went wrong, try clearing the cache.
            </AlertTitle>
          </Alert>
          <Button
            size="sm"
            onClick={() => {
              client.clearStore();
              localStorage.removeItem('token');
              window.location.replace('/');
            }}
          >
            Clear cache
          </Button>
        </Stack>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
};
