import { ApolloProvider } from '@apollo/client';
/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
// import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from 'cataloged-shared/components/Auth';
import { createApolloClient } from 'cataloged-shared/config/apollo';
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Router } from './src/Router';

export default function App() {
  const [config, setConfig] = useState<null | {
    client: any;
    persistor: any;
    tokenConfig: any;
  }>(null);

  useEffect(() => {
    (async () => {
      const tokenConfig = {
        set: async (token: string) =>
          await AsyncStorage.setItem('token', token),
        get: async () => await AsyncStorage.getItem('token'),
        remove: async () => await AsyncStorage.removeItem('token'),
      };

      // @ts-ignore
      const config = await createApolloClient({
        storage: AsyncStorage,
        getToken: tokenConfig.get,
      });

      setConfig({ ...config, tokenConfig });
    })();
  }, []);

  return (
    config && (
      <NavigationContainer>
        <ApolloProvider client={config.client}>
          <Auth tokenConfig={config.tokenConfig} persistor={config.persistor}>
            <Router />
          </Auth>
        </ApolloProvider>
      </NavigationContainer>
    )
  );
}

AppRegistry.registerComponent('Cataloged', () => App);
