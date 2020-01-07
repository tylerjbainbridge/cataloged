import { useMutation } from '@apollo/react-hooks';

import { DELETE_ITEM_MUTATION } from '../graphql/item';
import { FEED_QUERY } from '../components/Feed';
import { feed_items } from '../graphql/__generated__/feed';

export const useOptimisticDeleteItem = (item: any) =>
  useMutation(DELETE_ITEM_MUTATION, {
    variables: { itemId: item.id },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteItem: {
        id: '1234',
        __typename: 'Item',
      },
    },
    update: async (cache: any) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      const newListItems = data.items.filter(
        (i: feed_items) => i.id !== item.id,
      );

      await cache.writeQuery({
        query: FEED_QUERY,
        data: { items: newListItems },
      });
    },
  });
