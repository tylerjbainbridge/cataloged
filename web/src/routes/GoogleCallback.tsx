import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Location, History } from 'history';
import queryString from 'query-string';
import { googleSignIn } from './__generated__/googleSignIn';
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'react-router';

const GOOGLE_SIGN_IN_MUTATION = gql`
  mutation googleSignIn($code: String!) {
    googleSignIn(code: $code) {
      token
    }
  }
`;

export const GoogleCallback = ({
  location,
  devMode = true || process.env.NODE_ENV === 'production',
}: {
  location: Location;
  history: History;
  devMode: boolean;
}) => {
  const { setToken, setUser, user } = useAuth();
  const values = queryString.parse(location.search);

  const [googleSignIn, { data, error }] = useMutation<googleSignIn>(
    GOOGLE_SIGN_IN_MUTATION,
    {
      variables: { code: values.code },
      onCompleted: data => {
        if (data && !!data.googleSignIn.token && setToken) {
          setToken(data.googleSignIn.token);
        }
      },
      onError: error => {
        console.log('error!', error);
      },
    },
  );

  useEffect(() => {
    if (devMode) {
      googleSignIn();
    }
  }, []);

  return !user ? null : <Redirect to="/" />;
};
