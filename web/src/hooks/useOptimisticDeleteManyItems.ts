import { useMutation } from '@apollo/react-hooks';

import { DELETE_MANY_ITEMS_MUTATION } from '../graphql/item';
import { FEED_QUERY } from '../components/Feed';
import { feed_items } from '../graphql/__generated__/feed';
import { useToast } from '@chakra-ui/core';

export const useOptimisticDeleteManyItems = (
  items: feed_items[],
  options = {},
) => {
  const toast = useToast();

  const itemIds = items.map(({ id }) => id);

  return useMutation(DELETE_MANY_ITEMS_MUTATION, {
    variables: { itemIds },
    ...options,
    onCompleted: (...args) => {
      toast({
        title: 'Deleted',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteManyItems: [
        {
          id: '1234',
          __typename: 'Item',
        },
      ],
    },
    update: async (cache: any) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      const newListItems = data.items.filter(
        (i: feed_items) => !itemIds.includes(i.id),
      );

      await cache.writeQuery({
        query: FEED_QUERY,
        data: { items: newListItems },
      });
    },
  });
};
