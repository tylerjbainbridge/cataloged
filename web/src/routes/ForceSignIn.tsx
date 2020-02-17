import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Box, Spinner } from '@chakra-ui/core';

import { GET_GOOGLE_URL } from './SignIn';
import { getGoogleUrl } from '../graphql/__generated__/getGoogleUrl';

export const ForceSignIn = () => {
  const { data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL, {
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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Spinner size="xl" />
    </Box>
  );
};
