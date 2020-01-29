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

import {
  CREATE_NOTE_MUTATION,
  NOTE_FULL_FRAGMENT,
  UPDATE_NOTE_MUTATION,
} from '../graphql/note';

import { EMPTY_NOTE_VALUE, serializeToPlainText, Note } from './Note';
import { Labels } from './Labels';
import { useHotKey } from '../hooks/useHotKey';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';
import { useHistory } from 'react-router-dom';
import { useGoToPath } from '../hooks/useGoToPath';

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

  const [goTo] = useGoToPath();

  useHotKey('c n', () => {
    if (!note) onOpen();
  });

  const [createNote, { data, loading: isCreating }] = useMutation(
    CREATE_NOTE_MUTATION,
    {
      variables: {
        raw: JSON.stringify(EMPTY_NOTE_VALUE),
        text: serializeToPlainText(EMPTY_NOTE_VALUE),
      },
      refetchQueries: ['feed'],
      onCompleted: data => {
        goTo(`/item/${data?.createNote?.item?.id}`);
      },
    },
  );

  const note = data?.createNote;

  return (
    <Tooltip
      hasArrow
      placement="bottom"
      label="or press c + n"
      aria-label="Add note"
    >
      <Button
        variant="solid"
        cursor="pointer"
        isLoading={isCreating}
        onClick={() => createNote()}
      >
        <Icon name="plus-square" />
      </Button>
    </Tooltip>
  );
};
