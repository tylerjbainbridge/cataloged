import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import ErrorBoundary from 'react-error-boundary';
import { getAuthUser_me } from '../graphql/__generated__/getAuthUser';
import { googleAuth_googleAuth } from '../graphql/__generated__/googleAuth';
import { Stack, Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/core';
import { usePrevious } from '../hooks/usePrevious';
import { useHistory } from 'react-router-dom';

const GET_AUTH_USER = gql`
  query getAuthUser {
    me {
      id
      fullName
      email

      isActive

      role

      googleAccounts {
        id
        email
      }

      inviteCode {
        code
      }

      labels {
        id
        name
      }

      collections {
        id
        name
        description
      }
    }
  }
`;

type ContextProps = {
  user: getAuthUser_me;
  token: googleAuth_googleAuth['token'] | null;
  signIn: any;
  signOut: Function;
  refetchUser: () => Promise<any>;
};

export const AuthContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

export const Auth = ({ children }: { children: JSX.Element }) => {
  const client = useApolloClient();
  const history = useHistory();

  const [token, setToken] = useState<googleAuth_googleAuth['token'] | null>(
    localStorage.getItem('token'),
  );

  const { data, loading, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { token },
  });

  const signOut = () => {
    client.resetStore();
    localStorage.removeItem('token');
    setToken(null);
    window.location.replace('/');
  };

  const signIn = async (newToken: any) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    // await refetch();
    // window.location.replace('/');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const prevData = usePrevious(data);

  useEffect(() => {
    if (!prevData?.me && data?.me) {
      if (window.location.pathname.includes('google')) {
        history.push('/');
      }
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user: data ? data.me : null,
        token,
        signIn,
        refetchUser: refetch,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
