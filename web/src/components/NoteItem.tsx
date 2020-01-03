import React from 'react';
import { Box, Text } from '@chakra-ui/core';

import { feed_items, feed_items_note } from './__generated__/feed';
import { SelectOnClick } from './SelectOnClick';
import { NoteModal } from './NoteModal';
import { ItemContentContainer, ItemHeader } from './Item';

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
                border="1px solid black"
                rounded="lg"
                p={5}
                overflow="hidden"
                tooltip="Open note"
                {...clickProps}
              >
                <Text fontSize="xs">{note.text}</Text>
              </ItemContentContainer>
              <ItemHeader item={item}>{note.text}</ItemHeader>
            </>
          )}
        </SelectOnClick>
      )}
    </NoteModal>
  );
};
