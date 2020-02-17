import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';
import qs from 'query-string';
import { ItemFull } from '../graphql/__generated__/ItemFull';

export const useGoToPath = () => {
  const location = useLocation();
  const history = useHistory();

  const goTo = (
    pathname: string | null,
    {
      remove = [],
      add = {},
    }: {
      remove?: string[];
      add?: any;
    } = {},
  ) => {
    history.push({
      pathname: pathname || location.pathname,
      search: qs.stringify({
        ..._.omit(qs.parse(location.search), remove),
        ...add,
      }),
    });
  };

  return [goTo];
};

export const useRemoveFromQueryString = () => {
  const location = useLocation();
  const history = useHistory();

  const removeFromQueryString = (toRemove: string[]) => {
    history.push({
      pathname: location.pathname,
      search: qs.stringify(_.omit(qs.parse(location.search), toRemove)),
    });
  };

  return [removeFromQueryString];
};

export const useReturnToFeedFromItem = () => {
  const [goTo] = useGoToPath();

  return [() => goTo(null, { remove: ['itemId'] })];
};

export const useGoToItem = () => {
  const [goTo] = useGoToPath();

  return [(item: ItemFull) => goTo(null, { add: { itemId: item.id } })];
};
