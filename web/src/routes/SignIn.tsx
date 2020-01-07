import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Box, Button } from '@chakra-ui/core';
import { getGoogleUrl } from '../graphql/__generated__/getGoogleUrl';

export const GET_GOOGLE_URL = gql`
  query getGoogleUrl {
    googleURL
  }
`;

export const SignIn = () => {
  const { loading, error, data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL);

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
