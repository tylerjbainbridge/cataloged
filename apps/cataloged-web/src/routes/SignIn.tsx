import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { Box, Button } from '@chakra-ui/core';
import { getGoogleUrl } from 'cataloged-shared/graphql/__generated__/getGoogleUrl';

export const GET_GOOGLE_URL = gql`
  query getGoogleUrl(
    $origin: String
    $isAuthMethod: Boolean
    $scopes: [String!]
  ) {
    googleURL(origin: $origin, isAuthMethod: $isAuthMethod, scopes: $scopes)
  }
`;

export const SignIn = () => {
  const { loading, error, data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL, {
    variables: {
      origin: '/',
      isAuthMethod: true,
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Button
        isLoading={loading}
        isDisabled={!!(loading && data && data.googleURL) || !!error}
        onClick={() => {
          if (data && data.googleURL) {
            window.location.replace(data.googleURL);
          }
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};
