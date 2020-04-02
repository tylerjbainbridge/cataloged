import React from 'react';
import { ForceSignInView } from './views/ForceSignInView';
import { FeedView } from './views/FeedView';
import { ItemView } from './views/ItemView/ItemView';
import { ModalSelectView } from './views/ModalSelectView';

import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'cataloged-shared/hooks/useAuth';

const Stack = createStackNavigator();

export enum ROUTES {
  FORCE_SIGN_IN = 'ForceSignIn',
  START = 'AppStartView',
  FEED = 'FeedView',
  ITEM = 'ItemView',
  MODAL_SELECT = 'ModalSelectView',
}

export const APP_ROUTES = [
  {
    name: ROUTES.FEED,
    component: FeedView,
  },
  {
    name: ROUTES.ITEM,
    component: ItemView,
  },
  {
    name: ROUTES.MODAL_SELECT,
    component: ModalSelectView,
  },
];

export const Router = () => {
  const { user } = useAuth();

  return user ? (
    <Stack.Navigator headerMode="none" initialRouteName={ROUTES.START}>
      {APP_ROUTES.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} />
      ))}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator headerMode="none" initialRouteName={ROUTES.START}>
      <Stack.Screen name={ROUTES.FORCE_SIGN_IN} component={ForceSignInView} />
    </Stack.Navigator>
  );
};
