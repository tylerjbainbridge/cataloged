import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { useAuth } from 'cataloged-shared/hooks/useAuth';

import { ROUTES } from '../routes';

export const AppStart = () => {
  const { user } = useAuth();

  useEffect(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: !user ? ROUTES.FORCE_SIGN_IN : ROUTES.FEED,
        },
      },
    });
  }, [user]);

  return <></>;
};
