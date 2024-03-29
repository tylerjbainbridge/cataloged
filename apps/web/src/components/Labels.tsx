import React, { useState, useRef, useEffect, useContext } from 'react';
import FocusLock from 'react-focus-lock';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
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
  PseudoBox,
  Switch,
  Box,
  Text,
} from '@chakra-ui/core';

import color from 'color';

import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { theme } from '../styles/theme';

export const ITEM_LABEL_RESPONSE_FRAGMENT = gql`
  fragment ItemLabelResponseFragment on Item {
    id

    labels {
      id
      name
    }
  }
`;

export const CONNECT_LABEL_TO_ITEM_MUTATION = gql`
  mutation connectLabelToItem($name: String!, $itemId: String!) {
    connectLabelToItem(name: $name, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

export const DISCONNECT_LABEL_FROM_ITEM_MUTATION = gql`
  mutation disconnectLabelFromItem($labelId: String!, $itemId: String!) {
    disconnectLabelFromItem(labelId: $labelId, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

export const CREATE_LABEL_MUTATION = gql`
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
  showSelectedLabels = true,
  trigger = null,
  displayOnly = false,
  onApply,
  numDisplayLabels = 1,
}: {
  item?: any;
  selectedLabels?: any[];
  canAddLabels?: boolean;
  onSelectedLabelChange?: Function;
  showSelectedLabels?: boolean;
  trigger?: JSX.Element | null;
  displayOnly?: boolean;
  onApply?: (labels: any[]) => any;
  numDisplayLabels?: number;
}) => {
  const [cursor, setCursor] = useState(0);
  const { user, refetchUser } = useAuth();

  // const location = useLocation();

  // const { filter } = useContext(FeedContext);

  // Only relevant when managing it's own state.
  const [selectedLabels, setSelectedLabels] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const firstFieldRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isManagingOwnState = !item;

  useEffect(() => {
    if (initialSelectedLabels) setSelectedLabels(initialSelectedLabels);
  }, [isOpen]);

  useEffect(() => {
    if (
      onSelectedLabelChange &&
      !_.isEqual(selectedLabels, initialSelectedLabels)
    )
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

  const labelSet = _.orderBy(
    isManagingOwnState ? selectedLabels : item.labels,
    'name',
    'desc',
  );

  const filteredLabels = _.orderBy(
    user.labels.filter(({ name }: { name: string }) => {
      return (
        // @ts-ignore
        name.toLowerCase().includes(search || ''.toLowerCase())
      );
    }),
    'name',
    'desc',
  );

  // Rerender each time
  watch('search');

  useEffect(() => {
    setCursor(0);
  }, [search]);

  // useEffect(() => {
  //   const element = document.getElementById(filteredLabels[cursor].name);
  //   if (element) element.scrollIntoView();
  // }, [cursor]);

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

  const toggle = ({ id, name }: { id?: string; name: string }) => {
    const isChecked = !!labelSet.find(
      (existingLabel: { name: string }) => existingLabel.name === name,
    );

    if (isChecked) {
      if (id) removeAction({ id, name });
    } else {
      addAction(name);
    }
  };

  const onKeyDown = (event: any) => {
    if (event.key === 'Enter' && filteredLabels[cursor]) {
      toggle(filteredLabels[cursor]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
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

  // const addLabelToFilters = async ({ name }: any) => {
  //   // const variables = getFilterVariablesFromQueryString(location.search, user);

  //   const isExisting = variables.labels.find(
  //     (label: any) => label.name === name,
  //   );

  //   if (isExisting)
  //     _.remove(variables.labels, (label: any) => label.name === name);
  //   else variables.labels.push({ name });

  //   // await filter(getFilterVariablesFromFormValues(variables));
  // };

  const labelProps = {
    // backgroundColor: color(theme.colors.gray['50'])
    //   .lighten(0.8)
    //   .opaquer(0.2)
    //   .rgb()
    //   .string(),
    // color: color(theme.colors.gray['50'])
    //   .rgb()
    //   .string(),
  };

  const labelNodes = labelSet.map(
    ({ id, name }: { id: string; name: string }) => (
      <Tag minWidth="auto" size="md" key={name} m={1} {...labelProps}>
        {!displayOnly && (
          <TagIcon
            size="12px"
            icon="delete"
            cursor="pointer"
            onClick={e => {
              e.stopPropagation();
              removeAction({ id, name });
            }}
          />
        )}
        <TagLabel>{name}</TagLabel>
      </Tag>
    ),
  );

  return (
    <Box
      d="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      // height="40px"
    >
      <Box
        d="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        maxWidth="100%"
      >
        {!displayOnly && (
          <Popover
            // @ts-ignore
            // usePortal
            placement="bottom"
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            closeOnEsc={false}
            onClose={() => {
              setValue('search', '');
              setCursor(0);
              if (onClose) onClose();
            }}
          >
            <PopoverTrigger>
              {trigger || (
                <Button
                  mt={1}
                  size="xs"
                  height="25px"
                  onClick={e => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  aria-label="add labels"
                  variant="ghost"
                  mr={2}
                  cursor="pointer"
                  {...labelProps}
                >
                  <Icon size="14px" name="add" />
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent zIndex={100} width="400px">
              {/* <PopoverArrow bg="white" /> */}
              <Stack
                spacing="5px"
                shouldWrapChildren
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
              >
                <FormControl p={3}>
                  <InputGroup size="md" width="100%">
                    <Input
                      pr="4.5rem"
                      placeholder="Label"
                      name="search"
                      ref={(ref: any) => {
                        register(ref);
                        firstFieldRef.current = ref;
                      }}
                    />
                    {canAddLabels && (
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
                    )}
                  </InputGroup>
                </FormControl>
                {!!filteredLabels.length && (
                  <Stack
                    spacing={2}
                    height="200px"
                    maxWidth="100%"
                    overflowY="auto"
                  >
                    {filteredLabels.map(({ id, name }, idx) => {
                      const isChecked = !!labelSet.find(
                        (existingLabel: { name: string }) =>
                          existingLabel.name === name,
                      );
                      return (
                        <PseudoBox
                          id={name}
                          d="flex"
                          alignItems="center"
                          height="40px"
                          p={3}
                          key={name}
                          cursor="pointer"
                          bg={idx === cursor ? 'gray.50' : ''}
                          onMouseOver={() => setCursor(idx)}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle({ id, name });
                          }}
                        >
                          {/* This is the sibling input, it's visually hidden */}
                          <Switch size="sm" isChecked={isChecked} />
                          <Tag ml={3} {...labelProps}>
                            {name}
                          </Tag>
                        </PseudoBox>
                      );
                    })}
                  </Stack>
                )}
                {!!onApply && (
                  <Box
                    d="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    width="100%"
                    p={2}
                    pt={0}
                  >
                    <Button
                      cursor="pointer"
                      variantColor="teal"
                      size="md"
                      onClick={() => {
                        onApply(selectedLabels);
                        onClose();
                      }}
                    >
                      Apply ({labelSet.length})
                    </Button>
                  </Box>
                )}
              </Stack>
            </PopoverContent>
          </Popover>
        )}
        {showSelectedLabels && (
          <>
            <Box
              d="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              height="100%"
              overflowY="hidden"
              overflowX="hidden"
              flexWrap="wrap"
              maxWidth="100%"
            >
              {labelNodes.length
                ? _.take(labelNodes, numDisplayLabels)
                : null && (
                    <Text
                      ml={2}
                      fontSize="sm"
                      verticalAlign="center"
                      // color={labelProps.color}
                    >
                      No labels
                    </Text>
                  )}
            </Box>
            {labelNodes.length > numDisplayLabels && (
              <Popover trigger="hover" placement="bottom-start" closeOnBlur>
                <PopoverTrigger>
                  <Box>
                    <Tag
                      mt={1}
                      cursor="pointer"
                      minWidth="auto"
                      size="md"
                      mr={2}
                      {...labelProps}
                    >
                      <TagLabel>...</TagLabel>
                    </Tag>
                  </Box>
                </PopoverTrigger>
                <PopoverContent zIndex={100} width="200px" p={3}>
                  <Box>{labelNodes}</Box>
                </PopoverContent>
              </Popover>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
