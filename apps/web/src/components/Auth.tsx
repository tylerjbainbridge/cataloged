import { useApolloClient, useQuery } from '@apollo/client';
import { googleAuth_googleAuth } from 'cataloged-shared/graphql/__generated__/googleAuth';
import { AuthContext } from 'cataloged-shared/hooks/useAuth';
import { GET_AUTH_USER } from 'cataloged-shared/queries/user';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
