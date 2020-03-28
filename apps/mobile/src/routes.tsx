import { Navigation } from 'react-native-navigation';

import { ForceSignIn } from './views/ForceSignIn';
import { AppStart } from './views/AppStart';
import { Feed } from './views/Feed';

export enum ROUTES {
  FORCE_SIGN_IN = 'navigation.ForceSignIn',
  START = 'navigation.AppStart',
  FEED = 'navigation.Feed',
}

export const routes = [
  {
    name: ROUTES.START,
    component: AppStart,
  },
  {
    name: ROUTES.FEED,
    component: Feed,
  },
  {
    name: ROUTES.FORCE_SIGN_IN,
    component: ForceSignIn,
  },
];

export const push = (
  componentId: string,
  name: string,
  {
    props = {},
    options = {},
  }: {
    props?: any;
    options?: any;
  },
) =>
  Navigation.push(componentId, {
    component: {
      name,
      passProps: props,
      options,
    },
  });
