import { useAuth } from 'cataloged-shared/hooks/useAuth';
import React from 'react';
import { signOut as googleSignOut } from './GoogleSignIn';
import { Button } from './UI';

export const SignOut = (props: any) => {
  const { signOut } = useAuth();

  const attemptSignOut = async () => {
    try {
      await googleSignOut();
    } catch (e) {}

    try {
      signOut();
    } catch (e) {}
  };

  return <Button onPress={attemptSignOut} title="Sign out" {...props} />;
};
