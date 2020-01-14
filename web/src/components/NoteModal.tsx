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
} from '@chakra-ui/core';

import { CREATE_NOTE_MUTATION, NOTE_FULL_FRAGMENT } from '../graphql/note';

import { EMPTY_NOTE_VALUE, serializeToPlainText, Note } from './Note';
import { Labels } from './Labels';
import { useHotKey } from '../hooks/useHotKey';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';

export const NoteModal = ({
  item,
  children,
  disclosure: parentDisclosure,
  shouldRenderButton = true,
}: {
  item?: ItemFull;
  disclosure?: Disclosure;
  shouldRenderButton?: boolean;
  children?: (childProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => any;
}) => {
  const disclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = parentDisclosure || disclosure;

  const client = useApolloClient();

  useHotKey('c n', () => {
    if (!note) onOpen();
  });

  const [createNote, { data }] = useMutation(CREATE_NOTE_MUTATION, {
    variables: {
      raw: JSON.stringify(EMPTY_NOTE_VALUE),
      text: serializeToPlainText(EMPTY_NOTE_VALUE),
    },
    refetchQueries: ['feed'],
  });

  useEffect(() => {
    if (isOpen && !item) createNote();
  }, [isOpen]);

  const note =
    item && item.note
      ? item.note
      : data &&
        client.readFragment({
          id: data.createNote.id,
          fragment: NOTE_FULL_FRAGMENT,
        });

  return (
    <>
      {children
        ? children({ isOpen, onOpen, onClose })
        : shouldRenderButton && (
            <Tooltip
              hasArrow
              placement="bottom"
              label="or press c + n"
              aria-label="Add note"
            >
              <Button variant="solid" cursor="pointer" onClick={onOpen}>
                <Icon name="plus-square" />
              </Button>
            </Tooltip>
          )}

      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent height={700} width={700}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={5} height="100%">
              {note ? (
                <Note note={note} />
              ) : (
                <Box d="flex" justifyContent="center">
                  <Spinner />
                </Box>
              )}
            </Box>
          </ModalBody>
          {note && (
            <ModalFooter justifyContent="space-between" pt={5}>
              <Labels item={note.item} />
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
