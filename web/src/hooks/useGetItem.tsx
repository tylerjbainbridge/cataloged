import { useQuery, useApolloClient } from '@apollo/client';

import { ITEM_FULL_FRAGMENT, GET_ITEM } from '../graphql/item';

import { ItemFull } from '../graphql/__generated__/ItemFull';

export const useGetItem = (itemId: ItemFull['id']) => {
  const client = useApolloClient();

  let cachedItem = null;

  try {
    cachedItem = client.readFragment({
      id: itemId,
      fragment: ITEM_FULL_FRAGMENT,
      fragmentName: 'ItemFull',
    });
  } catch (e) {}

  const { data, loading } = useQuery(GET_ITEM, {
    variables: { id: itemId },
  });

  return {
    item: data?.item || cachedItem || null,
    loading,
  };
};
