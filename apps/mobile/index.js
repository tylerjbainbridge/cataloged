/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './App';
import { Navigation } from 'react-native-navigation';
import { name as appName } from './app.json';

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

AppRegistry.registerComponent(appName, () => App);
