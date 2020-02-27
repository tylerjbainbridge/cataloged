import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import _ from 'lodash';
import hotkeys from 'hotkeys-js';
import qs from 'query-string';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
} from '@chakra-ui/core';

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

export enum Action {
  OPEN_ITEM,
  GO_TO_SETTINGS,
  GO_TO_ITEM,
  VISIT_LINK,
  TOGGLE_FEED_VIEW_MODE,
  DELETE_ITEM,
  BULK_DELETE_ITEMS,
  BULK_LABEL_ITEMS,
  BULK_FAVORITE_ITEMS,
  TOGGLE_SELECT_ITEM,
  CREATE_LINK,
  CREATE_NOTE,
  CREATE_FILE,
}

export enum Priority {
  MAX = 11,
  SELECTED_ITEMS = 10,
  DEFAULT = 1,
}

export interface OptionArgs {
  relevantItems: ItemFull[];
  isViewingItem: boolean;
}

const getOptions = ({ relevantItems, isViewingItem }: OptionArgs) =>
  _.orderBy(
    [
      {
        value: Action.TOGGLE_FEED_VIEW_MODE,
        display: 'Toggle view grid mode',
        keybind: null,
      },
      {
        value: Action.GO_TO_SETTINGS,
        display: 'Go to settings',
        keybind: null,
      },
      {
        value: Action.GO_TO_ITEM,
        display: 'Go to item',
        priority: Priority.MAX,
        disabled: relevantItems.length !== 1 || isViewingItem,
        keybind: '#',
      },
      {
        value: Action.BULK_DELETE_ITEMS,
        display: `Delete item${relevantItems.length > 1 ? 's' : ''}`,
        priority: Priority.SELECTED_ITEMS,
        keybind: '#',
        disabled: !relevantItems.length,
      },
      {
        value: Action.BULK_FAVORITE_ITEMS,
        display: `Favorite item${relevantItems.length > 1 ? 's' : ''}`,
        priority: Priority.SELECTED_ITEMS,
        keybind: 'f',
        disabled: !relevantItems.length,
      },
      // {
      //   value: Action.BULK_LABEL_ITEMS,
      //   getDisplay: () => ({ relevantItems }: OptionArgs) =>
      //     `Label item${relevantItems.length > 1 ? 's' : ''}`,
      //   getPriority: () => Priority.SELECTED_ITEMS,
      //   keybind: 'l',
      // },
      {
        value: Action.VISIT_LINK,
        display: 'Visit link',
        priority: Priority.MAX,
        disabled:
          relevantItems.length !== 1 || relevantItems[0]?.type !== 'link',
      },
      {
        value: Action.CREATE_LINK,
        display: 'Catalog link',
      },
      {
        value: Action.CREATE_FILE,
        display: 'Catalog file',
      },
      // {
      //   value: Action.CREATE_NOTE,
      //   display: 'Catalog note',
      // },
    ].map(({ priority, ...rest }) => ({
      priority: priority || Priority.DEFAULT,
      ...rest,
    })),
    ({ priority }) => priority,
    'desc',
  );

export const useActionHandler = ({
  updateSelectedOption,
  formState,
  modalState,
  feedContext,
  selectContext,
  relevantItems,
  isViewingItem,
}: any) => {
  const match = useRouteMatch('*');

  const history = useHistory();
  const location = useLocation();

  const linkModalState = useGlobalModal(ModalName.CREATE_LINK_MODAL);
  const noteModalState = useGlobalModal(ModalName.CREATE_NOTE_MODAL);
  const fileModalState = useGlobalModal(ModalName.CREATE_FILES_MODAL);

  const [deleteItems] = useOptimisticDeleteManyItems(relevantItems, {
    onCompleted: () => {
      selectContext.deselectAllItems();
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
      onCompleted: selectContext.deselectAllItems,
    },
  );

  const [updateStatus] = useOptimisticUpdateStatusManyItems(
    relevantItems,
    'done',
    {
      onCompleted: selectContext.deselectAllItems,
    },
  );

  const [goToItem] = useGoToItem();
  const [goToFeed] = useReturnToFeedFromItem();

  const cleanup = () => {
    updateSelectedOption(null);
    formState.reset();
    modalState.closeModal();
  };

  const runAction = async (selectedOption: Action) => {
    const option = getOptions({ relevantItems, isViewingItem }).find(
      ({ value }) => value === selectedOption,
    );

    if (!option || option.disabled) {
      cleanup();
      return;
    }

    switch (selectedOption) {
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

      case Action.TOGGLE_FEED_VIEW_MODE: {
        cleanup();
        feedContext.setMode(feedContext.mode === 'grid' ? 'list' : 'grid');
        break;
      }

      case Action.TOGGLE_SELECT_ITEM: {
        cleanup();
        selectContext.selectItem(feedContext.cursorItem);
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
      case Action.CREATE_NOTE:
        cleanup();
        noteModalState.openModal();
        break;
      case Action.CREATE_FILE:
        cleanup();
        fileModalState.openModal();
        break;

      default:
        cleanup();
    }
  };

  return runAction;
};

export const CommandCenter = () => {
  const [selectedOption, updateSelectedOption] = useState<Action | null>(null);

  const location = useLocation();

  const formState = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const { getValues, watch, register } = formState;

  watch();
  const values = getValues();

  const feedContext = useContext(FeedContext);

  const selectContext = useContext(SelectContext);

  const itemId = qs.parse(location.search)?.itemId;

  let relevantItems = [];

  if (itemId) {
    relevantItems = [{ id: itemId }];
  } else if (selectContext.selectedItems.length) {
    relevantItems = selectContext.selectedItems;
  } else if (feedContext.cursorItem) {
    relevantItems = [feedContext.cursorItem];
  }

  const modalState = useGlobalModal(ModalName.COMMAND_CENTER_MODAL);

  const { isModalOpen, toggleModal, closeModal } = modalState;

  const inputRef = useRef(null);

  const runAction = useActionHandler({
    selectedOption,
    updateSelectedOption,
    modalState,
    formState,
    feedContext,
    selectContext,
    relevantItems,
    isViewingItem: !!itemId,
  });

  const runActionThunk = (action: Action) => () => runAction(action);

  useHotKey('cmd+k', toggleModal);
  useHotKey('esc', closeModal, { shouldBind: isModalOpen });

  useHotKey('enter', runActionThunk(Action.GO_TO_ITEM), {
    shouldBind: relevantItems.length === 1,
  });

  useHotKey('s', runActionThunk(Action.TOGGLE_SELECT_ITEM), {
    shouldBind: relevantItems.length === 1,
  });

  useHotKey('#', runActionThunk(Action.BULK_DELETE_ITEMS), {
    shouldBind: relevantItems.length > 0,
  });

  useEffect(() => {
    if (selectedOption) runAction(selectedOption);
  }, [selectedOption]);

  const options = getOptions({ relevantItems, isViewingItem: !!itemId }).filter(
    item => {
      return (
        !item.disabled &&
        (!values.search ||
          //@ts-ignore
          item.display.toLowerCase().includes(values.search.toLowerCase()))
      );
    },
  );

  const onKeyDown = useCallback(
    (getInputProps, { setHighlightedIndex, highlightedIndex }: any) => (
      event: any,
    ) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(
            highlightedIndex !== null
              ? highlightedIndex >= options.length - 1
                ? 0
                : highlightedIndex + 1
              : 0,
          );

          break;
        case 'ArrowUp':
          event.preventDefault();

          setHighlightedIndex(
            highlightedIndex <= 0 ? options.length - 1 : highlightedIndex - 1,
          );
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();

          const option = options[highlightedIndex];

          if (option) updateSelectedOption(option.value);

          setHighlightedIndex(null);
          break;
        case 'Escape':
          break;
        case 'Backspace':
          break;
        default:
          break;
      }
    },
    [values.search, options],
  );

  return (
    <Modal
      onClose={closeModal}
      scrollBehavior="inside"
      isOpen={isModalOpen}
      initialFocusRef={inputRef}
      size="full"
      isCentered
    >
      <ModalOverlay />

      <ModalContent as="form" height="300px" width="500px" rounded="lg">
        <ModalHeader>Cataloged</ModalHeader>
        <ModalCloseButton />

        {isModalOpen && (
          <Downshift
            defaultHighlightedIndex={0}
            selectedItem=""
            onSelect={() => {}}
            // @ts-ignore
            onChange={selection => updateSelectedOption(selection)}
            inputValue={values.search}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              inputValue,
              highlightedIndex,
              selectedItem,
              getRootProps,
              setHighlightedIndex,
            }) => {
              return (
                <ModalBody p="0px">
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
                      placeholder="search commands"
                      borderBottom="2px solid #5718FF"
                      pl="20px"
                      rounded="none"
                      value={values.search}
                      ref={(ref: any) => {
                        register(ref);
                        inputRef.current = ref;
                      }}
                      onKeyDown={onKeyDown(getInputProps, {
                        selectedItem,
                        highlightedIndex,
                        setHighlightedIndex,
                      })}
                    />
                  </Box>
                  <Box
                    {...getMenuProps()}
                    // @ts-ignore
                    width={inputRef?.current?.offsetWidth || '100%'}
                    position="absolute"
                    zIndex={100}
                    backgroundColor="white"
                    rounded="lg"
                  >
                    {options.map((item, index) => (
                      <Box
                        d="flex"
                        alignItems="center"
                        height="50px"
                        width="100%"
                        {...(index === options.length - 1
                          ? {
                              roundedBottomLeft: 'lg',
                              roundedBottomRight: 'lg',
                            }
                          : {})}
                        {...getItemProps({
                          key: item.value,
                          index,
                          // @ts-ignore
                          item: item.value,
                          // @ts-ignore
                          backgroundColor:
                            highlightedIndex === index
                              ? 'rgba(87,24,255, 0.1)'
                              : 'white',
                          fontWeight:
                            // @ts-ignore
                            selectedItem === item.value ? 'bold' : 'normal',
                        })}
                        pl="20px"
                      >
                        {item.display}
                      </Box>
                    ))}
                  </Box>
                </ModalBody>
              );
            }}
          </Downshift>
        )}
      </ModalContent>
    </Modal>
  );
};
