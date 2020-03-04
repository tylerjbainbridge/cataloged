import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import _ from 'lodash';
import qs from 'query-string';
import Mousetrap from 'mousetrap';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
  Text,
  Flex,
  Stack,
  Tag,
  Spinner,
  Icon,
  Button,
} from '@chakra-ui/core';
import { useMutation } from '@apollo/client';

import { useForm } from 'react-hook-form';
import Downshift, { useSelect } from 'downshift';

import { useGlobalModal, ModalName } from './GlobalModal';
import { useHotKey } from '../hooks/useHotKey';
import { FeedContext } from './Feed';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { SelectContext } from './SelectContainer';
import { useOptimisticDeleteManyItems } from '../hooks/useOptimisticDeleteManyItems';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { useOptimisticUpdateStatusManyItems } from '../hooks/useOptimisticUpdateStatusManyItems';
import { useGoToItem, useReturnToFeedFromItem } from '../hooks/useGoTo';
import { scrollToNodeIfOutOfView, getKeybindAsArray } from '../util/helpers';
import {
  FaCogs,
  FaList,
  FaArrowRight,
  FaTrash,
  FaStar,
  FaCheckSquare,
  FaExternalLinkAlt,
  FaFile,
  FaTh,
  FaCheck,
  FaTags,
  FaPenSquare,
  FaLayerGroup,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { usePrevious } from '../hooks/usePrevious';

import { CREATE_NOTE_MUTATION } from '../graphql/note';
import { EMPTY_NOTE_VALUE, serializeToPlainText } from './NoteEditor';
import { SidebarContext } from './Dashboard';
import { useGetItem } from '../hooks/useGetItem';
import cuid from 'cuid';
import { ADD_COLLECTION } from '../graphql/collection';
import { CommandCenterSelectLabels } from './CommandCenterSelectLabels';
import { CommandCenterSelectCollections } from './CommandCenterSelectCollections';

export enum Action {
  OPEN_ITEM = 'OPEN_ITEM',
  GO_TO_SETTINGS = 'GO_TO_SETTINGS',
  GO_TO_ITEM = 'GO_TO_ITEM',
  VISIT_LINK = 'VISIT_LINK',
  TOGGLE_FEED_VIEW_MODE = 'TOGGLE_FEED_VIEW_MODE',
  TOGGLE_SIDEBAR_OPEN = 'TOGGLE_SIDEBAR_OPEN',
  DELETE_ITEM = 'DELETE_ITEM',
  BULK_DELETE_ITEMS = 'BULK_DELETE_ITEMS',
  BULK_UPDATE_LABEL_ITEMS = 'BULK_UPDATE_LABEL_ITEMS',
  BULK_FAVORITE_ITEMS = 'BULK_FAVORITE_ITEMS',
  TOGGLE_SELECT_ITEM = 'TOGGLE_SELECT_ITEM',
  CREATE_LINK = 'CREATE_LINK',
  CREATE_NOTE = 'CREATE_NOTE',
  CREATE_FILE = 'CREATE_FILE',
  CREATE_COLLECTION = 'CREATE_COLLECTION',
  BULK_UPDATE_STATUS_ITEMS = 'BULK_UPDATE_STATUS_ITEMS',
  BULK_UPDATE_COLLECTION_ITEMS = 'BULK_UPDATE_COLLECTION_ITEMS',
}

export enum SecondaryAction {
  SELECT_LABELS = 'SELECT_LABELS',
  SELECT_COLLECTION = 'SELECT_COLLECTION',
  SELECT_STATUS = 'SELECT_STATUS',
}

export enum Priority {
  MAX = 10,
  SELECTED_ITEMS = 7,
  FREQUENT = 5,
  DEFAULT = 1,
}

export interface OptionArgs {
  relevantItems: ItemFull[];
  isViewingItem: boolean;
  feedContext: FeedContext;
  sidebarState: any;
}

const getOptions = ({
  relevantItems,
  isViewingItem,
  feedContext,
  sidebarState,
}: OptionArgs) =>
  _.orderBy(
    [
      {
        value: Action.TOGGLE_FEED_VIEW_MODE,
        display: 'Toggle feed view mode',
        keybind: 'mod+2',
        disabled: !feedContext.mode,
        icon: feedContext ? (
          feedContext.mode === 'grid' ? (
            <FaList />
          ) : (
            <FaTh />
          )
        ) : null,
      },
      {
        value: Action.TOGGLE_SIDEBAR_OPEN,
        display: 'Toggle side bar menu',
        keybind: 'mod+1',
        icon: (
          <Icon
            name={sidebarState.isOpen ? 'arrow-left' : 'arrow-right'}
            aria-label={sidebarState.isOpen ? 'close sidebar' : 'open sidebar'}
            width="15px"
          />
        ),
      },
      {
        value: Action.GO_TO_SETTINGS,
        display: 'Go to settings',
        icon: <FaCogs />,
      },
      {
        value: Action.GO_TO_ITEM,
        display: 'Go to item',
        priority: Priority.MAX,
        disabled: relevantItems.length !== 1 || isViewingItem,
        keybind: 'enter',
        icon: <FaArrowRight />,
      },
      {
        value: Action.BULK_UPDATE_LABEL_ITEMS,
        display: `Add item${relevantItems.length > 1 ? 's' : ''} to Label`,
        priority: Priority.SELECTED_ITEMS,
        keybind: 'l',
        // disabled: true,
        disabled: !relevantItems.length,
        secondary: SecondaryAction.SELECT_LABELS,
        icon: <FaTags />,
        // options: user.labels.map(({ name }) => ({ value: name })),
      },
      {
        value: Action.BULK_UPDATE_COLLECTION_ITEMS,
        display: `Add item${relevantItems.length > 1 ? 's' : ''} to Collection`,
        priority: Priority.SELECTED_ITEMS,
        keybind: 'c c c',
        // disabled: true,
        disabled: !relevantItems.length,
        secondary: SecondaryAction.SELECT_COLLECTION,
        icon: <FaLayerGroup />,
        // options: user.labels.map(({ name }) => ({ value: name })),
      },
      {
        value: Action.BULK_DELETE_ITEMS,
        display: `Delete item${relevantItems.length > 1 ? 's' : ''}`,
        priority: Priority.SELECTED_ITEMS,
        keybind: 'd d',
        disabled: !relevantItems.length,
        icon: <FaTrash />,
      },
      {
        value: Action.BULK_FAVORITE_ITEMS,
        display: `Favorite item${relevantItems.length > 1 ? 's' : ''}`,
        priority: Priority.SELECTED_ITEMS,
        keybind: 'f',
        disabled: !relevantItems.length,
        icon: <FaStar />,
      },
      {
        value: Action.TOGGLE_SELECT_ITEM,
        display: 'Select item',
        priority: Priority.SELECTED_ITEMS,
        keybind: 's',
        disabled: !relevantItems.length,
        icon: <FaCheckSquare />,
      },
      {
        value: Action.BULK_UPDATE_STATUS_ITEMS,
        display: 'Update status',
        priority: Priority.SELECTED_ITEMS,
        keybind: 'j',
        disabled: true,
        // disabled: !relevantItems.length,
        secondary: SecondaryAction.SELECT_STATUS,
        // options: user.labels.map(({ name }) => ({ value: name })),
      },
      {
        value: Action.VISIT_LINK,
        display: 'Visit link',
        priority: Priority.MAX,
        keybind: 'mod+enter',
        disabled:
          relevantItems.length !== 1 || relevantItems[0]?.type !== 'link',
        icon: <FaExternalLinkAlt />,
      },
      // {
      //   value: Action.CREATE_COLLECTION,
      //   display: 'Create collection',
      //   priority: Priority.FREQUENT,
      //   keybind: 'c c c',
      //   icon: <FaLayerGroup />,
      // },
      {
        value: Action.CREATE_LINK,
        display: 'Catalog link',
        priority: Priority.FREQUENT,
        keybind: 'c l',
        icon: <FaExternalLinkAlt />,
      },
      {
        value: Action.CREATE_FILE,
        display: 'Catalog file',
        priority: Priority.FREQUENT,
        keybind: 'c f',
        icon: <FaFile />,
      },
      {
        value: Action.CREATE_NOTE,
        display: 'Catalog note',
        priority: Priority.FREQUENT,
        keybind: 'c n',
        icon: <FaPenSquare />,
      },
    ].map(({ priority, ...rest }) => ({
      priority: priority || Priority.DEFAULT,
      ...rest,
    })),
    ({ priority }) => priority,
    'desc',
  );

export const useActionHandler = ({
  updatePrimaryAction,
  formState,
  modalState,
  isViewingItem,
}: any) => {
  const match = useRouteMatch('*');

  const history = useHistory();
  const location = useLocation();

  const feedContext = useContext(FeedContext);
  const selectContext = useContext(SelectContext);
  const sidebarState = useContext(SidebarContext);

  const relevantItems = useRelevantItems();

  const linkModalState = useGlobalModal(ModalName.CREATE_LINK_MODAL);
  const noteModalState = useGlobalModal(ModalName.CREATE_NOTE_MODAL);
  const fileModalState = useGlobalModal(ModalName.CREATE_FILES_MODAL);

  const [deleteItems] = useOptimisticDeleteManyItems(relevantItems, {
    onCompleted: () => {
      if (selectContext) selectContext.deselectAllItems();
      if (isViewingItem) goToFeed();
    },
  });

  const isEveryItemSelected = relevantItems.every(
    ({ isFavorited }: ItemFull) => isFavorited,
  );

  const isFavorited = !isEveryItemSelected;

  const [favoriteItems] = useOptimisticUpdateFavoriteManyItems(
    relevantItems,
    isFavorited,
    {
      onCompleted: () => !!selectContext && selectContext.deselectAllItems(),
    },
  );

  const [updateStatus] = useOptimisticUpdateStatusManyItems(
    relevantItems,
    'done',
    {
      onCompleted: () => !!selectContext && selectContext.deselectAllItems(),
    },
  );

  const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
    variables: {
      raw: JSON.stringify(EMPTY_NOTE_VALUE),
      text: serializeToPlainText(EMPTY_NOTE_VALUE),
    },
    refetchQueries: ['feed'],
    onCompleted: data => {
      goToItem(data?.createNote?.item);
    },
  });

  const [goToItem] = useGoToItem();
  const [goToFeed] = useReturnToFeedFromItem();

  const cleanup = () => {
    updatePrimaryAction(null);
    // formState.reset();
    modalState.closeModal();
  };

  const runAction = async (primaryAction: Action) => {
    const option = getOptions({
      relevantItems,
      isViewingItem,
      feedContext,
      sidebarState,
    }).find(({ value }) => value === primaryAction);

    if (!option || option.disabled) {
      cleanup();
      return;
    }

    switch (primaryAction) {
      case Action.GO_TO_SETTINGS: {
        cleanup();
        history.push({
          // @ts-ignore
          pathname: `${match.url}/settings`.replace('//', '/'),
          search: location.search,
        });
        break;
      }

      case Action.GO_TO_ITEM: {
        cleanup();
        goToItem(relevantItems[0]);
        break;
      }

      case Action.BULK_FAVORITE_ITEMS: {
        cleanup();
        await favoriteItems();
        break;
      }

      case Action.BULK_DELETE_ITEMS: {
        cleanup();
        deleteItems();
        break;
      }

      case Action.BULK_UPDATE_LABEL_ITEMS: {
        updatePrimaryAction(Action.BULK_UPDATE_LABEL_ITEMS);
        modalState.openModal();

        break;
      }

      case Action.TOGGLE_FEED_VIEW_MODE: {
        cleanup();
        if (feedContext) {
          feedContext.setMode(feedContext.mode === 'grid' ? 'list' : 'grid');
        }
        break;
      }

      case Action.TOGGLE_SIDEBAR_OPEN: {
        cleanup();
        sidebarState.onToggle();
        break;
      }

      case Action.TOGGLE_SELECT_ITEM: {
        cleanup();
        if (selectContext && selectContext) {
          selectContext.toggleItem(feedContext.cursorItem);
        }
        break;
      }

      case Action.VISIT_LINK: {
        cleanup();
        if (relevantItems[0]) {
          window.open(relevantItems[0]?.link?.href, '_blank');
        }
        break;
      }

      case Action.CREATE_LINK:
        cleanup();
        linkModalState.openModal();
        break;

      case Action.CREATE_FILE:
        cleanup();
        fileModalState.openModal();
        break;

      case Action.CREATE_NOTE:
        cleanup();
        await createNote();
        break;

      default:
        cleanup();
    }
  };

  return runAction;
};

const useKeyDown = (options: any[], onSelect: any) => {
  const handler = useCallback(
    ({ setHighlightedIndex, highlightedIndex, clearOnSelect = true }: any) => (
      event: any,
    ) => {
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();

          const newIndex =
            highlightedIndex !== null
              ? highlightedIndex >= options.length - 1
                ? 0
                : highlightedIndex + 1
              : 0;
          setHighlightedIndex(newIndex);
          scrollToNodeIfOutOfView(
            document.getElementById(`downshift-1-item-${newIndex}`),
          );

          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          const newIndex =
            highlightedIndex <= 0 ? options.length - 1 : highlightedIndex - 1;

          setHighlightedIndex(newIndex);

          scrollToNodeIfOutOfView(
            document.getElementById(`downshift-1-item-${newIndex}`),
          );
          break;
        }
        case 'Tab':
        case 'Enter':
          event.preventDefault();

          const option = options[highlightedIndex];

          if (option) onSelect(option);

          if (clearOnSelect) setHighlightedIndex(null);
          break;
        case 'Escape':
          break;
        case 'Backspace':
          break;
        default:
          break;
      }
    },
    [options],
  );

  return [handler];
};

export const useRelevantItems = () => {
  const location = useLocation();
  const feedContext = useContext(FeedContext);
  const selectContext = useContext(SelectContext);
  const itemId = qs.parse(location.search)?.itemId;

  let relevantItems = [];

  // @ts-ignore
  const { item: drawerItem } = useGetItem(itemId);

  if (itemId) {
    // console.log('Using open item');
    relevantItems = drawerItem ? [drawerItem] : [{ id: itemId }];
  } else if (selectContext?.selectedItems?.length) {
    // console.log('Using selected items');
    relevantItems = selectContext.selectedItems;
  } else if (feedContext?.cursorItem) {
    // console.log('Using cursor item', feedContext.cursorItem);
    relevantItems = [feedContext.cursorItem];
  }

  return relevantItems;
};

export const ModalSelect = ({
  handleSelection,
  header,
  getOptions,
  getItemNode,
  placeholder = 'Start typing...',
}: any) => {
  const formState = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const { getValues, watch, setValue, register } = formState;

  const inputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  watch();

  const values = getValues();

  const filteredOptions = getOptions(values.search, {
    setValue,
    search: values.search,
  });

  const [onKeyDownHandler] = useKeyDown(filteredOptions, (item: any) => {
    handleSelection(item, { setValue, search: values.search });
  });

  return (
    <>
      <ModalContent
        as="form"
        height="300px"
        maxHeight="300px"
        width="550px"
        rounded="lg"
      >
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />

        <Downshift
          defaultHighlightedIndex={0}
          selectedItem=""
          onSelect={() => {}}
          // @ts-ignore
          // onChange={selection => updatePrimaryAction(selection)}
          inputValue={values.search}
        >
          {({
            getItemProps,
            getMenuProps,
            highlightedIndex,
            selectedItem,
            getRootProps,
            setHighlightedIndex,
          }) => {
            return (
              <ModalBody p="0px" height="300px">
                <Box
                  // @ts-ignore
                  {...getRootProps({}, { suppressRefError: true })}
                >
                  <Input
                    size="lg"
                    name="search"
                    id="search"
                    width="100%"
                    variant="unstyled"
                    placeholder={placeholder}
                    borderBottom="2px solid #5718FF"
                    p="10px 10px 10px 23px"
                    rounded="none"
                    value={values.search}
                    ref={(ref: any) => {
                      register(ref);
                      inputRef.current = ref;
                    }}
                    onKeyDown={onKeyDownHandler({
                      selectedItem,
                      highlightedIndex,
                      setHighlightedIndex,
                      clearOnSelect: false,
                    })}
                  />
                </Box>
                <Box
                  {...getMenuProps()}
                  // @ts-ignore
                  width={inputRef?.current?.offsetWidth || '100%'}
                  // zIndex={100}
                  maxHeight="100%"
                  backgroundColor="white"
                  rounded="lg"
                  overflowY="scroll"
                >
                  {filteredOptions.map((item: any, index: number) => {
                    return (
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        height="60px"
                        width="100%"
                        cursor="pointer"
                        {...(index === 0
                          ? {
                              roundedTopLeft: '0px',
                              roundedTopRight: '0px',
                            }
                          : {})}
                        {...(index === filteredOptions.length - 1 &&
                        filteredOptions.length > 4
                          ? {
                              roundedBottomLeft: 'lg',
                              roundedBottomRight: 'lg',
                            }
                          : {})}
                        {...getItemProps({
                          key: item.name + item.id + index,
                          index,
                          // @ts-ignore
                          item,
                          onClick: () => handleSelection(item),
                          // @ts-ignore
                          backgroundColor:
                            highlightedIndex === index
                              ? 'rgba(87,24,255, 0.1)'
                              : 'white',
                        })}
                        pl="20px"
                      >
                        {getItemNode(item, index)}
                      </Flex>
                    );
                  })}
                </Box>
              </ModalBody>
            );
          }}
        </Downshift>
      </ModalContent>
    </>
  );
};

export const SelectPrimaryAction = ({
  activeOptions,
  updatePrimaryAction,
}: any) => {
  const relevantItems = useRelevantItems();

  return (
    <ModalSelect
      handleSelection={(selection: any) => updatePrimaryAction(selection.value)}
      header={
        <>
          Command Center{' '}
          {relevantItems.length ? ` (${relevantItems.length})` : ''}
        </>
      }
      getOptions={(search: string) =>
        activeOptions.filter(
          (option: any) =>
            !search ||
            //@ts-ignore
            option.display.toLowerCase().includes(search.toLowerCase()),
        )
      }
      getItemNode={(item: any) => (
        <>
          <Flex alignItems="center" color="gray.700">
            {item.icon && (
              <Box mr="10px">
                {React.cloneElement(item.icon, { size: '12px' })}
              </Box>
            )}{' '}
            <Text fontSize="lg" fontWeight="semibold">
              {item.display}
            </Text>
          </Flex>
          {!!item.keybind && (
            <Stack d="flex" alignItems="center" pr="20px" spacing={2} isInline>
              {getKeybindAsArray(item.keybind).map((key, idx) =>
                key === 'then' ? (
                  <Text key={idx + key}>then</Text>
                ) : (
                  <Tag
                    size="sm"
                    key={idx + key}
                    variantColor="gray"
                    textAlign="center"
                  >
                    {key}
                  </Tag>
                ),
              )}
            </Stack>
          )}
        </>
      )}
    />
  );
};

export const CommandCenter = () => {
  const [primaryAction, updatePrimaryAction] = useState<Action | null>(null);

  const { user } = useAuth();

  const location = useLocation();
  const feedContext = useContext(FeedContext);
  const selectContext = useContext(SelectContext);
  const sidebarState = useContext(SidebarContext);

  const itemId = qs.parse(location.search)?.itemId;

  const relevantItems = useRelevantItems();

  const modalState = useGlobalModal(ModalName.COMMAND_CENTER_MODAL);

  const { isModalOpen, toggleModal, closeModal } = modalState;

  const inputRef = useRef(null);

  const activeOptions = getOptions({
    relevantItems,
    isViewingItem: !!itemId,
    feedContext,
    sidebarState,
  }).filter(item => !item.disabled);

  const params = {
    primaryAction,
    updatePrimaryAction,
    modalState,
    feedContext,
    selectContext,
    relevantItems,
    isViewingItem: !!itemId,
    user,
    activeOptions,
  };

  const runAction = useActionHandler(params);

  const runActionThunk = (action: Action) => () => runAction(action);

  useHotKey('mod+k', toggleModal);
  useHotKey('esc', closeModal, { shouldBind: isModalOpen });

  const secondaryAction = activeOptions.find(
    option => option.value === primaryAction,
  )?.secondary;

  useEffect(() => {
    if (primaryAction && !secondaryAction) runAction(primaryAction);
  }, [primaryAction]);

  const prevIsModalOpen = usePrevious(primaryAction);

  useEffect(() => {
    if (prevIsModalOpen && !isModalOpen) {
      updatePrimaryAction(null);
    }
  }, [!isModalOpen]);

  useEffect(() => {
    // const body = document.querySelector('body');
    // const mousetrap = body ? new Mousetrap(body) : new Mousetrap();

    activeOptions.forEach(({ keybind, value, disabled }) => {
      if (keybind) {
        Mousetrap.unbind(keybind);
        if (!disabled) {
          Mousetrap.bind(keybind, e => {
            e.stopPropagation();
            e.preventDefault();

            runAction(value);

            return false;
          });
        }
      }
    });
  }, [activeOptions, relevantItems]);

  let node = null;

  if (!primaryAction && !secondaryAction) {
    node = <SelectPrimaryAction {...params} />;
  } else if (secondaryAction) {
    // @ts-ignore
    const Component = {
      [SecondaryAction.SELECT_LABELS]: CommandCenterSelectLabels,
      [SecondaryAction.SELECT_COLLECTION]: CommandCenterSelectCollections,
      // @ts-ignore
    }[secondaryAction];

    node = <Component {...params} />;
  }

  return (
    <Modal
      onClose={closeModal}
      // scrollBehavior="inside"
      isOpen={isModalOpen}
      initialFocusRef={inputRef}
      size="xl"
    >
      <ModalOverlay />
      {isModalOpen && node}
    </Modal>
  );
};
