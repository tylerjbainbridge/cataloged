import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/core';
import { UPDATE_STATUS_MANY_ITEMS_MUTATION } from 'cataloged-shared/graphql/item';
import { ItemConnectionFull_edges } from 'cataloged-shared/graphql/__generated__/ItemConnectionFull';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { FEED_QUERY } from '../queries/feed';


/**
 * IMPORTANT- pass status from the time of mutation func
 */
export const useOptimisticUpdateStatusManyItems = (
  items: ItemFull[],
  status: string | null,
  options = {},
) => {
  const toast = useToast();

  const itemIds = items.map(({ id }) => id);

  return useMutation(UPDATE_STATUS_MANY_ITEMS_MUTATION, {
    variables: { itemIds, status },
    ...options,
    onCompleted: (...args) => {
      toast({
        title: 'Updated',
        status: 'success',
        duration: 2000,
        position: 'bottom-left',
      });

      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateStatusManyItems: [],
    },
    update: async (cache: any) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      const newEdges = data.itemsConnection.edges.map(
        (i: ItemConnectionFull_edges) => {
          if (itemIds.includes(i.node.id)) {
            return {
              ...i,
              node: { ...i.node, status },
            };
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
