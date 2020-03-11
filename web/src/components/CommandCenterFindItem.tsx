import React from 'react';

import { CommandCenterSearchItems } from './CommandCenterSearchItems';
import { useGoToItem } from '../hooks/useGoTo';
import { ItemFull } from '../graphql/__generated__/ItemFull';

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
