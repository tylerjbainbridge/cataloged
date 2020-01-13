import { useMutation } from '@apollo/react-hooks';

import { DELETE_MANY_ITEMS_MUTATION } from '../graphql/item';
import { FEED_QUERY } from '../components/Feed';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { ItemConnectionFull_edges } from '../graphql/__generated__/ItemConnectionFull';

export const useOptimisticDeleteManyItems = (
  items: ItemFull[],
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

      const newEdges = data.itemsConnection.edges.filter(
        (i: ItemConnectionFull_edges) => !itemIds.includes(i.node.id),
      );

      await cache.writeQuery({
        query: FEED_QUERY,
        data: {
          itemsConnection: {
            ...data.itemsConnection,
            edges: newEdges,
          },
        },
      });
    },
  });
};
