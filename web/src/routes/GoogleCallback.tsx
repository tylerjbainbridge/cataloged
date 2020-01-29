import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Location, History } from 'history';
import queryString from 'query-string';
import { useAuth } from '../hooks/useAuth';
import { Redirect, useLocation } from 'react-router';
import { googleSignIn } from '../graphql/__generated__/googleSignIn';

const GOOGLE_SIGN_IN_MUTATION = gql`
  mutation googleSignIn($code: String!) {
    googleSignIn(code: $code) {
      token
    }
  }
`;

export const GoogleCallback = ({
  devMode = true || process.env.NODE_ENV === 'production',
}: {
  devMode?: boolean;
}) => {
  const location = useLocation();
  const { setToken, user } = useAuth();
  const values = queryString.parse(location.search);

  const [googleSignIn] = useMutation<googleSignIn>(GOOGLE_SIGN_IN_MUTATION, {
    variables: { code: values.code },
    onCompleted: data => {
      if (data && !!data.googleSignIn.token && setToken) {
        setToken(data.googleSignIn.token);
      }
    },
    onError: error => {
      console.log('error!', error);
    },
  });

  useEffect(() => {
    if (devMode) {
      googleSignIn();
    }
  }, []);

  return !user ? null : <Redirect to="/" />;
};
