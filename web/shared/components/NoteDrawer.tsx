import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
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

import { NoteEditor } from './NoteEditor';
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

export const NoteDrawer = ({
  item,
  onClose,
  drawerContentProps,
}: NoteDrawerProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const { note } = item;

  const [updateNote, { loading: isSaving }] = useMutation(UPDATE_NOTE_MUTATION);

  return (
    <>
      <DrawerContent
        key={item.id}
        d="flex"
        width={isMobile ? '100%' : '65%'}
        flexWrap="wrap"
        zIndex={200}
        {...drawerContentProps}
      >
        {!isMobile && (
          <Box
            d="flex"
            width={isMobile ? '100%' : 'calc(100% - 450px)'}
            justifyContent="center"
            height="100%"
          >
            <NoteEditor note={note} updateNote={updateNote}>
              {({ editable, toolbar, titleInput }: any) => (
                <>
                  <Box width="100%" position="absolute" top={0}>
                    {titleInput}
                  </Box>
                  <Flex
                    justifyContent="center"
                    height="100%"
                    width="100%"
                    overflowY="auto"
                  >
                    <Box height="100%" width="80%" pb="200px" pt="90px">
                      <Box height="100%" width="100%">
                        {editable}
                      </Box>
                    </Box>
                  </Flex>
                  <Box width="100%" position="absolute" bottom={0}>
                    {toolbar}
                  </Box>
                </>
              )}
            </NoteEditor>
          </Box>
        )}
        <Flex
          width={isMobile ? '100%' : '450px'}
          minWidth={isMobile ? '100%' : '450px'}
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
                  width={isMobile ? '100%' : 'calc(100% - 450px)'}
                  justifyContent="center"
                  height="100%"
                  border="1px solid black"
                  rounded="lg"
                >
                  <NoteEditor note={note} updateNote={updateNote}>
                    {({ editable, toolbar }: any) => (
                      <Box>
                        {editable}
                        {toolbar}
                      </Box>
                    )}
                  </NoteEditor>
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

          <Box maxHeight="50%">
            <ItemDrawerMeta item={item} />
          </Box>
        </Flex>
      </DrawerContent>
    </>
  );
};
