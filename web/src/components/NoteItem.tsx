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
                d="flex"
                border="1px solid black"
                rounded="lg"
                tooltip="Open note"
                alignItems="center"
                justifyContent="center"
                item={item}
                {...clickProps}
              >
                <Icon name="edit" size="50px" />
              </ItemContentContainer>
              <ItemHeader item={item}>{note.text}</ItemHeader>
            </>
          )}
        </SelectOnClick>
      )}
    </NoteModal>
  );
};
