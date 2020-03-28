import React from 'react';
/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
import { ApolloProvider } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { createApolloClient } from 'cataloged-shared/config/apollo';
import { Auth } from 'cataloged-shared/components/Auth';
import { routes, ROUTES } from './src/routes';
// import { name as appName } from './app.json';

(async () => {
  const tokenConfig = {
    set: async (token: string) => await AsyncStorage.setItem('token', token),
    get: async () => await AsyncStorage.getItem('token'),
    remove: async () => await AsyncStorage.removeItem('token'),
  };

  // @ts-ignore
  const client = await createApolloClient({
    storage: AsyncStorage,
    getToken: tokenConfig.get,
  });

  const wrapComponent = (Component: any) => () => (
    <ApolloProvider client={client}>
      <Auth tokenConfig={tokenConfig}>
        <Component />
      </Auth>
    </ApolloProvider>
  );

  Navigation.events().registerAppLaunchedListener(() => {
    // Each time the event is received we should call Navigation.setRoot

    routes.forEach((route) => {
      Navigation.registerComponent(route.name, () =>
        // @ts-ignore
        wrapComponent(route.component),
      );
    });

    Navigation.setRoot({
      root: {
        component: {
          name: ROUTES.START,
        },
      },
    });
  });
})();
