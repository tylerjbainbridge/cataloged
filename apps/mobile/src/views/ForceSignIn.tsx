import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { GoogleSignIn } from '../components/GoogleSignIn';
import { Box } from '../components/UI';

export const ForceSignIn = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <GoogleSignIn />
        </Box>
      </SafeAreaView>
    </>
  );
};
