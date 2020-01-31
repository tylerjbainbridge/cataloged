import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';
import qs from 'query-string';
import { ItemFull } from '../graphql/__generated__/ItemFull';

export const useGoToPath = () => {
  const location = useLocation();
  const history = useHistory();

  const goTo = (
    pathname: string = '/',
    {
      remove = [],
      add = {},
    }: {
      remove?: string[];
      add?: any;
    } = {},
  ) => {
    history.push({
      pathname,
      search: qs.stringify({
        ..._.omit(qs.parse(location.search), remove),
        ...add,
      }),
    });
  };

  return [goTo];
};

export const useReturnToFeedFromItem = () => {
  const [goTo] = useGoToPath();

  return [() => goTo('/', { remove: ['itemId'] })];
};

export const useGoToItem = () => {
  const [goTo] = useGoToPath();

  return [(item: ItemFull) => goTo('/', { add: { itemId: item.id } })];
};
