import { useMutation } from '@apollo/react-hooks';

import { DELETE_ITEM_MUTATION } from '../graphql/item';
import { FEED_QUERY } from '../components/Feed';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { ItemConnectionFull_edges } from '../graphql/__generated__/ItemConnectionFull';

export const useOptimisticDeleteItem = (item: any, options = {}) => {
  const toast = useToast();

  return useMutation(DELETE_ITEM_MUTATION, {
    variables: { itemId: item.id },
    onCompleted: (...args) => {
      if (item.type === 'note' && item?.note?.text) {
        toast({
          title: 'Deleted',
          status: 'success',
          duration: 2000,
          position: 'top',
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
};
