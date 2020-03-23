import React from 'react';

import { CommandCenterSearchItems } from './CommandCenterSearchItems';
import { useGoToItem } from 'cataloged-shared/hooks/useGoTo';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';

export const CommandCenterFindItem = ({ modalState }: any) => {
  const [goToItem] = useGoToItem();

  return (
    <CommandCenterSearchItems
      onItemSelect={(item: ItemFull) => {
        modalState.closeModal();
        goToItem(item);
      }}
    />
  );
};
