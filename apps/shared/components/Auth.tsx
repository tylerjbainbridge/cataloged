import React, { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { googleAuth_googleAuth } from '../graphql/__generated__/googleAuth';
import { AuthContext } from '../hooks/useAuth';
import { GET_AUTH_USER } from '../queries/user';

const WEB_TOKEN_CONFIG = {
  set: (token: string) => global?.window?.localStorage.setItem('token', token),
  get: () => global?.window?.localStorage.getItem('token'),
  remove: () => global?.window?.localStorage.removeItem('token'),
};

export const Auth = ({
  children,
  tokenConfig = WEB_TOKEN_CONFIG,
}: {
  children: JSX.Element;
  tokenConfig?: {
    set: any;
    get: any;
    remove: any;
  };
}) => {
  const client = useApolloClient();

  const [token, setToken] = useState<googleAuth_googleAuth['token'] | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      setToken(await tokenConfig.get());
    })();
  }, []);

  const { data, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { token },
  });

  const signOut = async () => {
    client.resetStore();
    await tokenConfig.remove();
    setToken(null);
  };

  const signIn = async (newToken: any) => {
    await tokenConfig.set(newToken);
    setToken(newToken);
    // await refetch();
  };

  useEffect(() => {
    (async () => {
      if (token) {
        await tokenConfig.set(token);
      } else {
        await tokenConfig.remove();
      }
    })();
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
