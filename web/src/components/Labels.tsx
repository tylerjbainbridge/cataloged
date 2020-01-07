import React, { useState, useRef, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Input,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  InputRightElement,
  FormControl,
  Icon,
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

const CREATE_LABEL_MUTATION = gql`
  mutation createLabel($name: String!) {
    createLabel(name: $name) {
      # user
      id

      labels {
        id
        name
      }
    }
  }
`;

export const Labels = ({
  item = null,
  canAddLabels = true,
  selectedLabels: initialSelectedLabels,
  onSelectedLabelChange,
}: {
  item?: any;
  selectedLabels?: any[];
  canAddLabels?: boolean;
  onSelectedLabelChange?: Function;
}) => {
  const [cursor, setCursor] = useState(0);

  // Only relevant when managing it's own state.<
  const [selectedLabels, setSelectedLabels] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const firstFieldRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, refetchUser } = useAuth();

  const isManagingOwnState = !item;

  useEffect(() => {
    if (initialSelectedLabels) setSelectedLabels(initialSelectedLabels);
  }, []);

  useEffect(() => {
    if (onSelectedLabelChange && selectedLabels !== initialSelectedLabels)
      onSelectedLabelChange(selectedLabels);
  }, [selectedLabels && selectedLabels.length]);

  const { getValues, setValue, register, watch } = useForm<{ search: string }>({
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

  const [createLabel] = useMutation(CREATE_LABEL_MUTATION);

  const { search } = getValues();

  const labelSet = isManagingOwnState ? selectedLabels : item.labels;

  const filteredLabels = _.take(
    user.labels.filter(({ name }: { name: string }) => {
      return (
        !labelSet.find(
          (existingLabel: { name: string }) => existingLabel.name === name,
        ) &&
        // @ts-ignore
        name.toLowerCase().includes(search.toLowerCase())
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

  const addAction = async (name: string) => {
    if (isManagingOwnState) {
      let label = user.labels.find((l: any) => l.name === name);

      if (!label) {
        const { data } = await createLabel({ variables: { name } });
        label = data.createLabel.labels.find((l: any) => l.name === name);
      }

      setSelectedLabels([...selectedLabels, label]);
      setValue('search', '');
    } else {
      connectLabelToItem({
        variables: {
          name,
          itemId: item.id,
        },
      });
    }
  };

  const removeAction = ({ id, name }: { id: string; name: string }) => {
    if (isManagingOwnState) {
      const labelIdx = selectedLabels.findIndex(label => label.name === name);

      setSelectedLabels([
        ...selectedLabels.slice(0, labelIdx),
        ...selectedLabels.slice(labelIdx + 1),
      ]);
    } else {
      disconnectLabelFromItem({
        variables: { labelId: id, itemId: item.id },
      });
    }
  };

  const onKeyDown = (event: any) => {
    if (event.metaKey && event.key === 'Enter' && search) {
      addAction(search);
    } else if (event.key === 'Enter' && filteredLabels[cursor]) {
      addAction(filteredLabels[cursor].name);
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

  const createFromSearch = () => !connecting && addAction(search);

  return (
    <Stack
      d="flex"
      flexDirection="row"
      alignItems="flex-start"
      alignContent="flex-start"
      flexWrap="wrap"
    >
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
        {canAddLabels && (
          <PopoverTrigger>
            <Button
              size="xs"
              height="25px"
              onClick={onOpen}
              aria-label="add labels"
              variant="outline"
              mr={2}
              cursor="pointer"
            >
              <Icon size="10px" name="add" />
            </Button>
          </PopoverTrigger>
        )}
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
                  {filteredLabels.map(({ name }, idx) => (
                    <Tag
                      size="md"
                      key={name}
                      cursor="pointer"
                      variantColor={idx === cursor ? 'cyan' : 'gray'}
                      onMouseOver={() => setCursor(idx)}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        addAction(name);
                      }}
                    >
                      <TagIcon icon="add" size="6px" />
                      <TagLabel>{name}</TagLabel>
                    </Tag>
                  ))}
                </Stack>
              )}
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
      {labelSet.map(({ id, name }: { id: string; name: string }) => (
        <Tag
          size="md"
          key={name}
          mr={2}
          mb={5}
          cursor="pointer"
          onClick={() => removeAction({ id, name })}
        >
          <TagIcon size="12px" icon="delete" />
          <TagLabel>{name}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};
