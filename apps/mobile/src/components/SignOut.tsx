import { useAuth } from 'cataloged-shared/hooks/useAuth';
import React from 'react';
import { signOut as googleSignOut } from './GoogleSignIn';
import { Button } from './UI';
import { Navigation } from 'react-native-navigation';
import { ROUTES } from '../routes';

export const SignOut = (props: any) => {
  const { signOut } = useAuth();

  const attemptSignOut = async () => {
    try {
      await googleSignOut();
    } catch (e) {}

    try {
      signOut();
    } catch (e) {}

    Navigation.setRoot({
      root: {
        component: {
          name: ROUTES.START,
        },
      },
    });
  };

  return <Button onPress={attemptSignOut} title="Sign out" {...props} />;
};
