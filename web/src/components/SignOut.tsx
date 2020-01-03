import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@chakra-ui/core';

export const SignOut = () => {
  const auth = useAuth();

  return (
    <Button
      cursor="pointer"
      onClick={() => {
        if (auth.signOut) auth.signOut();
      }}
    >
      Sign out
    </Button>
  );
};
