import { useMutation, useApolloClient, gql } from '@apollo/client';
import _ from 'lodash';

import {
  CONNECT_ITEM_TO_ITEM_MUTATION,
  DICONNECT_ITEM_FROM_ITEM_MUTATION,
  ITEM_TO_ITEM_FRAGMENT,
  ITEM_FULL_FRAGMENT,
} from 'cataloged-shared/graphql/item';

import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { useToast } from '@chakra-ui/core';

export const useOptimisticItemToItem = () => {
  const toast = useToast();
  const client = useApolloClient();

  const [_disconnectItemFromItem] = useMutation(
    DICONNECT_ITEM_FROM_ITEM_MUTATION,
  );

  const [_connectItemToItem] = useMutation(CONNECT_ITEM_TO_ITEM_MUTATION);

  const getFragmentMeta = (item: ItemFull) => ({
    id: `Item:${item.id}`,
    fragment: ITEM_FULL_FRAGMENT,
    fragmentName: 'ItemFull',
  });

  const disconnectItemFromItem = async (
    itemOne: ItemFull,
    itemTwo: ItemFull,
  ) => {
    try {
      const itemOneFull = client.readFragment(getFragmentMeta(itemOne));

      const itemTwoFull = client.readFragment(getFragmentMeta(itemTwo));

      [
        [itemOneFull, itemTwoFull],
        [itemTwoFull, itemOneFull],
      ].forEach(([item, otherItem]) => {
        try {
          client.writeFragment({
            ...getFragmentMeta(item),
            data: {
              ...item,
              items: item.items.filter((item: any) => item.id !== otherItem.id),
            },
          });
        } catch (e) {}
      });
    } catch (e) {}

    await _disconnectItemFromItem({
      variables: { itemOneId: itemOne.id, itemTwoId: itemTwo.id },
    });

    toast({
      title: 'Disconnected items',
      status: 'success',
      duration: 2000,
      position: 'bottom-left',
    });
  };

  const connectItemToItem = async (itemOne: ItemFull, itemTwo: ItemFull) => {
    try {
      const itemOneFull = client.readFragment(getFragmentMeta(itemOne));

      const itemTwoFull = client.readFragment(getFragmentMeta(itemTwo));

      [
        [itemOneFull, itemTwoFull],
        [itemTwoFull, itemOneFull],
      ].forEach(([item, otherItem]) => {
        client.writeFragment({
          ...getFragmentMeta(item),
          data: {
            ...item,
            items: [...item.items, otherItem],
          },
        });
      });
    } catch (e) {}

    await _connectItemToItem({
      variables: { itemOneId: itemOne.id, itemTwoId: itemTwo.id },
    });

    toast({
      title: 'Connected items',
      status: 'success',
      duration: 2000,
      position: 'bottom-left',
    });
  };

  return {
    disconnectItemFromItem,
    connectItemToItem,
  };
};
