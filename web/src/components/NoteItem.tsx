import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/core';

import { SelectOnClick } from './SelectOnClick';
import { NoteModal } from './NoteModal';
import { ItemContentContainer, ItemHeader } from './Item';
import { feed_items_note, feed_items } from '../graphql/__generated__/feed';

export interface ItemWithNote extends feed_items {
  note: feed_items_note;
}

export const NoteItem = ({ item }: { item: ItemWithNote }) => {
  const { note } = item;

  return (
    <NoteModal item={item}>
      {({ open }) => (
        <SelectOnClick onSingleClick={open} item={item}>
          {clickProps => (
            <>
              <ItemContentContainer
                tooltip="Open note"
                item={item}
                {...clickProps}
              >
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
      )}
    </NoteModal>
  );
};
