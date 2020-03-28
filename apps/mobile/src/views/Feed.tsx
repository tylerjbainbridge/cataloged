import React from 'react';
import { Box, Text } from '../components/UI';
import { SafeAreaView, StatusBar } from 'react-native';

import { ScrollView } from 'react-native';
import { useAuth } from 'cataloged-shared/hooks/useAuth';

export const Feed = () => {
  const { user } = useAuth();

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
          <Text>Signed in as {user.email}</Text>
        </Box>
      </SafeAreaView>
    </>
  );
};
