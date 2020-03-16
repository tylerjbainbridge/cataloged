import React from 'react';

import { CommandCenterSearchItems } from './CommandCenterSearchItems';
import { useGoToItem } from '../hooks/useGoTo';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { useOptimisticItemToItem } from '../hooks/useOptimisticItemToItem';
import { useRelevantItems } from './CommandCenter';

export const CommandCenterConnectItemToItem = ({ modalState }: any) => {
  const { connectItemToItem } = useOptimisticItemToItem();

  const relevantItems = useRelevantItems();

  return (
    <CommandCenterSearchItems
      header="Connect item to..."
      onItemSelect={(item: ItemFull) => {
        connectItemToItem(relevantItems[0], item);
        modalState.closeModal();
      }}
    />
  );
};
