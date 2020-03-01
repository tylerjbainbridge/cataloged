import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Location, History } from 'history';
import queryString from 'query-string';
import { useAuth } from '../hooks/useAuth';
import { Redirect, useLocation, useHistory } from 'react-router';
import base64url from 'base64url';

import { googleAuth } from '../graphql/__generated__/googleAuth';
import {
  Spinner,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Alert,
  Button,
  Stack,
} from '@chakra-ui/core';

const GOOGLE_AUTH_MUTATION = gql`
  mutation googleAuth($code: String!) {
    googleAuth(code: $code) {
      token
    }
  }
`;

export interface State {
  origin?: string;
  isAuthMethod?: boolean;
  googleAccountId?: string;
  syncContent?: string;
}

const getStateSafe = (values: any): State => {
  if (values.state) {
    try {
      // @ts-ignore
      const decoded = base64url.decode(values?.state || '');
      const state = JSON.parse(decoded);

      return state;
    } catch (e) {
      return {};
    }
  }

  return {};
};

export const GoogleCallback = ({
  devMode = true || process.env.NODE_ENV === 'production',
}: {
  devMode?: boolean;
}) => {
  const location = useLocation();
  const history = useHistory();

  const { setToken, user } = useAuth();
  const values = queryString.parse(location.search);

  const state = getStateSafe(values);

  console.log(state);

  const [googleAuth, { error, loading }] = useMutation<googleAuth>(
    GOOGLE_AUTH_MUTATION,
    {
      variables: { code: values.code, isAuthMethod: !!state?.isAuthMethod },
      onCompleted: data => {
        if (data?.googleAuth?.token) {
          setToken(data.googleAuth.token);
        }

        const newState: any = {};

        if (state?.googleAccountId)
          newState.googleAccountId = state?.googleAccountId;

        if (state?.syncContent) newState.syncContent = state?.syncContent;

        const query = queryString.stringify(newState);

        history.push(`${state?.origin || '/'}${query ? `?${query}` : ''}`);
      },
    },
  );

  useEffect(() => {
    googleAuth().catch(() => {});
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      {loading && <Spinner size="xl" />}
      {error && (
        <Stack spacing="15px">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Authentication failed!</AlertTitle>
          </Alert>
          <Button size="sm" onClick={() => window.location.replace('/')}>
            Try again
          </Button>
        </Stack>
      )}
    </Box>
  );
};
