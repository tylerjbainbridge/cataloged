/**
 * @format
 */
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { App } from './App';
import { Navigation } from 'react-native-navigation';
import { createApolloClient } from 'cataloged-shared/config/apollo';
import { Auth } from 'cataloged-shared/components/Auth';
// import { name as appName } from './app.json';

(async () => {
  // @ts-ignore
  // const client = await createApolloClient({ storage: window.localStorage });

  // const wrapComponent = (Component: any) => () => (
  //   <ApolloProvider client={client}>
  //     <Auth>
  //       <Component />
  //     </Auth>
  //   </ApolloProvider>
  // );

  Navigation.registerComponent(`navigation.ForceSignIn`, () => App);

  Navigation.events().registerAppLaunchedListener(() => {
    // Each time the event is received we should call Navigation.setRoot

    Navigation.setRoot({
      root: {
        component: {
          name: 'navigation.ForceSignIn',
        },
      },
    });
  });
})();
