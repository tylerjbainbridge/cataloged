import React from 'react';

import { CommandCenterSearchItems } from './CommandCenterSearchItems';
import { useGoToItem } from 'cataloged-shared/hooks/useGoTo';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { useOptimisticItemToItem } from 'cataloged-shared/hooks/useOptimisticItemToItem';
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
