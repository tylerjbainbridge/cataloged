/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { GoogleSignIn } from './src/components/GoogleSignIn';
import { Box } from './src/components/UI';

export const App = () => {
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
