import React from 'react';
import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { Button } from '@chakra-ui/core';

export const SignOut = () => {
  const auth = useAuth();

  return (
    <Button
      cursor="pointer"
      onClick={() => {
        window.localStorage.removeItem('cataloged-cache');
        if (auth.signOut) auth.signOut();
      }}
    >
      Sign out
    </Button>
  );
};
