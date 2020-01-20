import { useMutation } from '@apollo/react-hooks';

import { UPDATE_FAVORITE_MANY_ITEMS_MUTATION } from '../graphql/item';
import { FEED_QUERY } from '../components/Feed';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { ItemConnectionFull_edges } from '../graphql/__generated__/ItemConnectionFull';

export const useOptimisticUpdateFavoriteManyItems = (
  items: ItemFull[],
  isFavorited: boolean,
  options = {},
) => {
  const toast = useToast();

  // const isFavorited = !items.every(({ isFavorited }: ItemFull) => isFavorited);

  const itemIds = items.map(({ id }) => id);

  return useMutation(UPDATE_FAVORITE_MANY_ITEMS_MUTATION, {
    variables: { itemIds, isFavorited },
    ...options,
    onCompleted: (...args) => {
      toast({
        title: 'Updated',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateFavoriteManyItems: [],
    },
    update: async (cache: any) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      const newEdges = data.itemsConnection.edges.map(
        (i: ItemConnectionFull_edges) => {
          if (itemIds.includes(i.node.id)) {
            return { ...i, node: { ...i.node, isFavorited } };
          }

          return i;
        },
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
