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
  persistor,
}: {
  children: JSX.Element;
  persistor: any;
  tokenConfig?: {
    set: any;
    get: any;
    remove: any;
  };
}) => {
  const client = useApolloClient();

  useEffect(() => {
    (async () => {
      // console.log('current token', await tokenConfig.get());
    })();
  }, []);

  const { data, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = async () => {
    try {
      await persistor.pause(); // Pause automatic persistence.
      await persistor.purge(); // Delete everything in the storage provider.

      await client.clearStore();

      await tokenConfig.remove();

      await persistor.resume();
    } catch (e) {
      console.log('something went wrong');
      console.log(e);
    }
  };

  const signIn = async (newToken: any) => {
    await tokenConfig.set(newToken);
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user: data ? data.me : null,
        signIn,
        refetchUser: refetch,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
