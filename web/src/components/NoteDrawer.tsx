import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  Box,
  Icon,
  Spinner,
  DrawerContent,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  MenuItem,
} from '@chakra-ui/core';

import { UPDATE_NOTE_MUTATION } from '../graphql/note';

import { Note } from './Note';
import { Labels } from './Labels';
import { ItemFull, ItemFull_note } from '../graphql/__generated__/ItemFull';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { ItemActionMenu } from './ItemActionMenu';
import { ItemDrawerMeta } from './ItemDrawerMeta';
import { ItemStatusInput } from './ItemStatusInput';

export interface ItemWithNote extends ItemFull {
  note: ItemFull_note;
}

export interface NoteDrawerProps extends ItemDrawerProps {
  item: ItemWithNote;
}

export const NoteDrawer = ({ item, onClose }: NoteDrawerProps) => {
  const { note } = item;

  const [updateNote, { loading: isSaving }] = useMutation(UPDATE_NOTE_MUTATION);

  return (
    <>
      <DrawerContent width="80%">
        <Flex>
          <Box
            p={30}
            width="calc(100% - 350px)"
            justifyContent="center"
            height="100%"
          >
            {note ? (
              <Note note={note} updateNote={updateNote} />
            ) : (
              <Box d="flex" justifyContent="center">
                <Spinner />
              </Box>
            )}
          </Box>
        </Flex>
        <Flex
          width="350px"
          minWidth="350px"
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          p="20px"
          borderLeft="1px solid lightgray"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box>
            <Flex width="100%" justifyContent="flex-end">
              <ItemActionMenu item={item}>
                {menuNodes => (
                  <>
                    <MenuItem d="flex" alignItems="center" onClick={onClose}>
                      <Icon name="close" fontSize="12px" mr="5px" /> Close
                    </MenuItem>
                    {Object.values(menuNodes)}
                  </>
                )}
              </ItemActionMenu>
            </Flex>
            <Stack spacing="20px">
              <FormControl>
                <FormLabel htmlFor="title">Status</FormLabel>
                <ItemStatusInput item={item} size="md" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="title">Labels</FormLabel>
                <Labels item={item} numDisplayLabels={10} />
              </FormControl>
            </Stack>
          </Box>

          <ItemDrawerMeta item={item} />
        </Flex>
      </DrawerContent>
    </>
  );
};
