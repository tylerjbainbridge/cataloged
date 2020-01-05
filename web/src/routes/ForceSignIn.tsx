import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getGoogleUrl } from './__generated__/getGoogleUrl';
import { Box, Spinner } from '@chakra-ui/core';

const GET_GOOGLE_URL = gql`
  query getGoogleUrl {
    googleURL
  }
`;

export const ForceSignIn = () => {
  const { data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL);

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
