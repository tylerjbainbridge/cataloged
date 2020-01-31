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
import { useGoToPath, useGoToItem } from '../hooks/useGoTo';

export const NoteModal = ({
  children,
}: {
  item?: ItemFull;
  disclosure?: Disclosure;
  shouldRenderButton?: boolean;
  children: (childProps: { createNote: any; isCreating: boolean }) => any;
}) => {
  const [goToItem] = useGoToItem();

  const [createNote, { data, loading: isCreating }] = useMutation(
    CREATE_NOTE_MUTATION,
    {
      variables: {
        raw: JSON.stringify(EMPTY_NOTE_VALUE),
        text: serializeToPlainText(EMPTY_NOTE_VALUE),
      },
      refetchQueries: ['feed'],
      onCompleted: data => {
        goToItem(data?.createNote?.item);
      },
    },
  );

  useHotKey(
    'c n',
    () => {
      createNote();
    },
    { isGlobal: true },
  );

  return children({ createNote, isCreating });
};
