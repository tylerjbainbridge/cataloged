import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Location, History } from 'history';
import queryString from 'query-string';
import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { Redirect, useLocation, useHistory } from 'react-router';
import base64url from 'base64url';

import { googleAuth } from 'cataloged-shared/graphql/__generated__/googleAuth';
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
import { usePrevious } from 'cataloged-shared/hooks/usePrevious';
import { GOOGLE_AUTH_MUTATION } from 'cataloged-shared/queries/google';

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

  const { signIn, user } = useAuth();
  const values = queryString.parse(location.search);

  const state = getStateSafe(values);

  const [googleAuth, { error, loading }] = useMutation<googleAuth>(
    GOOGLE_AUTH_MUTATION,
    {
      variables: { code: values.code, isAuthMethod: !!state?.isAuthMethod },
      onCompleted: async data => {
        if (state?.syncContent) {
          const newState: any = {};

          if (state?.googleAccountId)
            newState.googleAccountId = state?.googleAccountId;

          if (state?.syncContent) newState.syncContent = state?.syncContent;

          const query = queryString.stringify(newState);

          history.push(`${state?.origin || '/'}${query ? `?${query}` : ''}`);
        } else if (data?.googleAuth?.token) {
          await signIn(data.googleAuth.token);
          // window.location.replace('/');
        }
      },
    },
  );

  useEffect(() => {
    googleAuth().catch(e => console.error(e));
  }, []);

  const prevUser = usePrevious(user);

  useEffect(() => {
    if (!prevUser && user) {
      if (window.location.pathname.includes('google')) {
        history.push('/');
      }
    }
  }, [user]);

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
          <Button size="sm" onClick={window.location.reload}>
            Try again
          </Button>
        </Stack>
      )}
    </Box>
  );
};
