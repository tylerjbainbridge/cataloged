import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from 'semantic-ui-react';

export const SignOut = () => {
  const auth = useAuth();

  return (
    <Button
      onClick={() => {
        if (auth.signOut) auth.signOut();
      }}
    >
      Sign out
    </Button>
  );
};
