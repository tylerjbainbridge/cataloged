import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  Box,
  Button,
  Icon,
  Spinner,
  ModalFooter,
  Tooltip,
  useDisclosure,
  DrawerContent,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  MenuItem,
} from '@chakra-ui/core';

import {
  CREATE_NOTE_MUTATION,
  NOTE_FULL_FRAGMENT,
  UPDATE_NOTE_MUTATION,
} from '../graphql/note';

import { EMPTY_NOTE_VALUE, serializeToPlainText, Note } from './Note';
import { Labels } from './Labels';
import { useHotKey } from '../hooks/useHotKey';
import { ItemFull, ItemFull_note } from '../graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { ItemActionMenu } from './ItemActionMenu';
import { ItemDrawerMeta } from './ItemDrawerMeta';

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
          <Box p={30} height="100%">
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
