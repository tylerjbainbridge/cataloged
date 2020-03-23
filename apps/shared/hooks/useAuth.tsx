import React, { useContext } from 'react';
import { getAuthUser_me } from '../graphql/__generated__/getAuthUser';
import { googleAuth_googleAuth } from '../graphql/__generated__/googleAuth';

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

export const useAuth = () => {
  return useContext(AuthContext);
};
