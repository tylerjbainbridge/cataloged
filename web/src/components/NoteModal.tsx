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
} from '@chakra-ui/core';

import { CREATE_NOTE_MUTATION, NOTE_FULL_FRAGMENT } from '../graphql/note';
import { feed_items_note } from './__generated__/feed';

import { EMPTY_NOTE_VALUE, serializeToPlainText, Note } from './Note';
import { Labels } from './Labels';

export const NoteModal = ({
  note: existingNote,
  children,
}: {
  note?: feed_items_note;
  children?: (childProps: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  }) => any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const client = useApolloClient();

  const [createNote, { data }] = useMutation(CREATE_NOTE_MUTATION, {
    variables: {
      raw: JSON.stringify(EMPTY_NOTE_VALUE),
      text: serializeToPlainText(EMPTY_NOTE_VALUE),
    },
    refetchQueries: ['feed'],
  });

  useEffect(() => {
    if (isOpen && !existingNote) createNote();
  }, [isOpen]);

  const note = existingNote
    ? existingNote
    : data &&
      client.readFragment({
        id: data.createNote.id,
        fragment: NOTE_FULL_FRAGMENT,
      });

  if (isOpen) console.log({ note });

  return (
    <>
      {children ? (
        children({ isOpen, open, close })
      ) : (
        <Button variant="solid" cursor="pointer" onClick={open}>
          <Icon name="plus-square" />
        </Button>
      )}

      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={close}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent width={700}>
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
            <ModalFooter justifyContent="flex-start">
              <Box mt={10}>
                <Labels item={note.item} />
              </Box>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
