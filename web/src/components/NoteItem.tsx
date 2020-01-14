import React, { useContext } from 'react';
import { Box, Icon } from '@chakra-ui/core';

import { SelectOnClick } from './SelectOnClick';
import { ItemContentContainer, ItemHeader } from './Item';
import { ItemFull, ItemFull_note } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';

export interface ItemWithNote extends ItemFull {
  note: ItemFull_note;
}

export const NoteItem = ({ item }: { item: ItemWithNote }) => {
  const { openItemModal } = useContext(FeedContext);

  const { note } = item;

  const onOpen = () => openItemModal(item);

  return (
    <SelectOnClick onSingleClick={onOpen} item={item}>
      {clickProps => (
        <>
          <ItemContentContainer tooltip="Open note" item={item} {...clickProps}>
            <Box
              d="flex"
              width="100%"
              height="100%"
              rounded="lg"
              alignItems="center"
              justifyContent="center"
              backgroundColor="gray.50"
            >
              <Icon name="edit" size="50px" />
            </Box>
          </ItemContentContainer>
          <ItemHeader item={item}>{note.text}</ItemHeader>
        </>
      )}
    </SelectOnClick>
  );
};
