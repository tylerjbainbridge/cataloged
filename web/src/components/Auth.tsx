import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getAuthUser_me } from './__generated__/getAuthUser';
import { googleSignIn_googleSignIn } from '../routes/__generated__/googleSignIn';

const GET_AUTH_USER = gql`
  query getAuthUser {
    me {
      id
      fullName
      email
    }
  }
`;

type ContextProps = {
  user: getAuthUser_me | null;
  token: googleSignIn_googleSignIn['token'] | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<getAuthUser_me | null>>;
  signOut: Function;
  refetchUser: () => Promise<void>;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

const localStorageUser = localStorage.getItem('user');

const parsedLocalStorageUser: getAuthUser_me | null = localStorageUser
  ? JSON.parse(localStorageUser)
  : null;

export const Auth = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<getAuthUser_me | null>(
    parsedLocalStorageUser,
  );

  const [token, setToken] = useState<googleSignIn_googleSignIn['token'] | null>(
    localStorage.getItem('token'),
  );

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  const client = useApolloClient();

  const refetchUser = async () => {
    try {
      const { data } = await client.query({
        query: GET_AUTH_USER,
        fetchPolicy: 'network-only',
      });

      setUser(data.me);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      refetchUser();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user ? user.id : null]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, refetchUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
