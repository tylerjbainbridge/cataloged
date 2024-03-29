import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/core';
import { DELETE_ITEM_MUTATION } from 'cataloged-shared/graphql/item';
import { ItemConnectionFull_edges } from 'cataloged-shared/graphql/__generated__/ItemConnectionFull';
import { FEED_QUERY } from '../queries/feed';
import { confirmMutation } from '../util/helpers';

export const useOptimisticDeleteItem = (item: any, options = {}) => {
  const toast = useToast();

  const mutation = useMutation(DELETE_ITEM_MUTATION, {
    variables: { itemId: item.id },
    onCompleted: (...args) => {
      if (item.type === 'note' && item?.note?.text) {
        toast({
          title: 'Deleted',
          status: 'success',
          duration: 2000,
          position: 'bottom-left',
        });
      }

      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
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

      const newEdges = data.itemsConnection.edges.filter(
        (i: ItemConnectionFull_edges) => i.node.id !== item.id,
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

  return confirmMutation(
    mutation,
    `Are you sure you'd like to delete this item?`,
  );
};
