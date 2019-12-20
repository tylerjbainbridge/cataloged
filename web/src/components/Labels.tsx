import React, { useState, useRef, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import _ from 'lodash';
import useForm from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Box,
  Input,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  InputRightElement,
  FormControl,
  IconButton,
  Stack,
  TagIcon,
  TagLabel,
  Button,
  InputGroup,
  useDisclosure,
} from '@chakra-ui/core';
import { useAuth } from '../hooks/useAuth';

const ITEM_LABEL_RESPONSE_FRAGMENT = gql`
  fragment ItemLabelResponseFragment on Item {
    id

    labels {
      id
      name
    }
  }
`;

const CONNECT_LABEL_TO_ITEM_MUTATION = gql`
  mutation connectLabelToItem($name: String!, $itemId: String!) {
    connectLabelToItem(name: $name, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

const DISCONNECT_LABEL_FROM_ITEM_MUTATION = gql`
  mutation disconnectLabelFromItem($labelId: String!, $itemId: String!) {
    disconnectLabelFromItem(labelId: $labelId, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

export const Labels = ({ item }: { item: any }) => {
  const [cursor, setCursor] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const firstFieldRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, refetchUser } = useAuth();

  const { getValues, setValue, register, watch } = useForm({
    defaultValues: { search: '' },
  });

  const [connectLabelToItem, { loading: connecting }] = useMutation(
    CONNECT_LABEL_TO_ITEM_MUTATION,
    {
      onCompleted: async () => {
        if (refetchUser) await refetchUser();
        setValue('search', '');
      },
    },
  );

  const [disconnectLabelFromItem] = useMutation(
    DISCONNECT_LABEL_FROM_ITEM_MUTATION,
  );

  const { search } = getValues();

  const filteredLabels = _.take(
    user.labels.filter(({ name }: { name: string }) => {
      return (
        !item.labels.find(
          (existingLabel: { name: string }) => existingLabel.name === name,
        ) && name.toLowerCase().includes(search.toLowerCase())
      );
    }),
    4,
  );

  // Rerender each time
  watch('search');

  useEffect(() => {
    setCursor(0);
  }, [search]);

  useEffect(() => {
    if (cursor > filteredLabels.length - 1) {
      setCursor(filteredLabels.length - 1);
    }
  }, [connecting]);

  useEffect(() => {
    if (isOpen && !isEditing) setIsEditing(true);
    else if (!isOpen && isEditing) setIsEditing(false);
  }, [isOpen]);

  const connectToItem = (name: string) =>
    connectLabelToItem({
      variables: {
        name,
        itemId: item.id,
      },
    });

  const onKeyDown = (event: any) => {
    if (event.metaKey && event.key === 'Enter' && search) {
      connectToItem(search);
    } else if (event.key === 'Enter' && filteredLabels[cursor]) {
      connectToItem(filteredLabels[cursor].name);
    }
  };

  const onKeyUp = (event: any) => {
    if (event.keyCode === 38) {
      if (cursor > 0) {
        setCursor(cursor - 1);
      } else {
        setCursor(filteredLabels.length - 1);
      }
    } else if (event.keyCode === 40) {
      if (cursor < filteredLabels.length - 1) {
        setCursor(cursor + 1);
      } else {
        setCursor(0);
      }
    }
  };

  const createFromSearch = () => !connecting && connectToItem(search);

  return (
    <>
      <Popover
        placement="bottom"
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={() => {
          setValue('search', '');
          setCursor(0);
          if (onClose) onClose();
        }}
      >
        <PopoverTrigger>
          <IconButton
            onClick={onOpen}
            aria-label="add labels"
            mr="2"
            size="sm"
            icon="edit"
          />
        </PopoverTrigger>
        <PopoverContent zIndex={4} p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow bg="white" />
            <Stack
              spacing={4}
              shouldWrapChildren
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            >
              <FormControl>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    placeholder="Label"
                    name="search"
                    ref={register}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="sm"
                      h="1.75rem"
                      isLoading={connecting}
                      onClick={createFromSearch}
                    >
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {!!filteredLabels.length && (
                <Stack spacing={2}>
                  {filteredLabels.map(({ id, name }, idx) => (
                    <Tag
                      size="lg"
                      key={id}
                      variantColor={idx === cursor ? 'cyan' : 'gray'}
                      onMouseOver={() => setCursor(idx)}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        connectToItem(name);
                      }}
                      cursor="pointer"
                    >
                      <TagIcon icon="add" size="12px" />
                      <TagLabel>{name}</TagLabel>
                    </Tag>
                  ))}
                </Stack>
              )}
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
      <Stack spacing={2} height="sm" shouldWrapChildren isInline>
        {item.labels.map(({ id, name }: { id: string; name: string }) => (
          <Tag
            size="lg"
            key={id}
            cursor="pointer"
            onClick={() =>
              disconnectLabelFromItem({
                variables: { labelId: id, itemId: item.id },
              })
            }
          >
            <TagIcon size="12px" icon="delete" />
            <TagLabel>{name}</TagLabel>
          </Tag>
        ))}
      </Stack>
    </>
  );
};
