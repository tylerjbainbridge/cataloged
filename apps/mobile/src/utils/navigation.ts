// import { Navigation } from 'react-native-navigation';
import { ROUTES } from '../Router';

export const goToItem = (
  navigation: any,
  componentId: string,
  itemId: string,
) => {
  console.log({ componentId });

  Navigation.push(componentId, {
    component: {
      name: ROUTES.ITEM,
      passProps: {
        itemId,
      },
    },
  });
};
