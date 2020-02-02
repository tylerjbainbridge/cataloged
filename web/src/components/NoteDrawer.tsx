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
  Divider,
} from '@chakra-ui/core';

import { UPDATE_NOTE_MUTATION } from '../graphql/note';

import { Note } from './Note';
import { Labels } from './Labels';
import { ItemFull, ItemFull_note } from '../graphql/__generated__/ItemFull';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { ItemActionMenu } from './ItemActionMenu';
import { ItemDrawerMeta } from './ItemDrawerMeta';
import { ItemStatusInput } from './ItemStatusInput';
import { useMedia } from 'react-use';

export interface ItemWithNote extends ItemFull {
  note: ItemFull_note;
}

export interface NoteDrawerProps extends ItemDrawerProps {
  item: ItemWithNote;
}

export const NoteDrawer = ({ item, onClose }: NoteDrawerProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const { note } = item;

  const [updateNote, { loading: isSaving }] = useMutation(UPDATE_NOTE_MUTATION);

  return (
    <>
      <DrawerContent d="flex" width={isMobile ? '100%' : '80%'} flexWrap="wrap">
        {!isMobile && (
          <Flex>
            <Box
              p={30}
              width={isMobile ? '100%' : 'calc(100% - 350px)'}
              justifyContent="center"
              height="100%"
            >
              <Note note={note} updateNote={updateNote} />
            </Box>
          </Flex>
        )}
        <Flex
          width={isMobile ? '100%' : '350px'}
          minWidth={isMobile ? '100%' : '350px'}
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          p="20px"
          borderLeft="1px solid lightgray"
          justifyContent="space-between"
          flexDirection="column"
          overflowY="auto"
        >
          <Box>
            <Stack spacing="20px">
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
              {isMobile && (
                <Box
                  p={5}
                  width={isMobile ? '100%' : 'calc(100% - 350px)'}
                  justifyContent="center"
                  height="100%"
                  border="1px solid black"
                  rounded="lg"
                >
                  <Note note={note} updateNote={updateNote} />
                </Box>
              )}
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
