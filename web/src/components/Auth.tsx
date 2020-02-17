import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getAuthUser_me } from '../graphql/__generated__/getAuthUser';
import { googleAuth_googleAuth } from '../graphql/__generated__/googleAuth';

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
    }
  }
`;

type ContextProps = {
  user: getAuthUser_me;
  token: googleAuth_googleAuth['token'] | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  signOut: Function;
  refetchUser: () => Promise<any>;
};

export const AuthContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { data, loading, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const [token, setToken] = useState<googleAuth_googleAuth['token'] | null>(
    localStorage.getItem('token'),
  );

  const signOut = () => {
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

  return (
    <AuthContext.Provider
      value={{
        user: data ? data.me : null,
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
