import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getAuthUser_me } from '../graphql/__generated__/getAuthUser';
import { googleSignIn_googleSignIn } from '../graphql/__generated__/googleSignIn';

const GET_AUTH_USER = gql`
  query getAuthUser {
    me {
      id
      fullName
      email

      labels {
        id
        name
      }
    }
  }
`;

type ContextProps = {
  user: getAuthUser_me;
  token: googleSignIn_googleSignIn['token'] | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  signOut: Function;
  refetchUser: () => Promise<any>;
};

export const AuthContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

const localStorageUser = localStorage.getItem('user');

const getParsedUser = (): getAuthUser_me | null =>
  localStorageUser ? JSON.parse(localStorageUser) : null;

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { data, loading, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
  });

  const [token, setToken] = useState<googleSignIn_googleSignIn['token'] | null>(
    localStorage.getItem('token'),
  );

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (!data || data.me) refetch();
    } else if (!loading) {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (data && data.me) {
      localStorage.setItem('user', JSON.stringify(data.me));
    } else if (!loading) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{
        user: data ? data.me : getParsedUser(),
        token,
        setToken,
        refetchUser: refetch,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
