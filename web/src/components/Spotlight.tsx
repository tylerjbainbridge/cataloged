import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

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

const SINGLE_ITEM_OPTIONS = [
  {
    value: 'OPEN_ITEM',
    display: 'Open item in Cataloged',
  },
  {
    value: 'DELETE_ITEM',
    display: 'Delete item',
  },
];

const BULK_ITEM_ACTIONS = [
  {
    value: 'BULK_DELETE_ITEMS',
    display: 'Delete items',
  },
  {
    value: 'BULK_LABEL_ITEMS',
    display: 'Label items',
  },
];

const GENERIC_ACTIONS = [
  {
    value: 'TOGGLE_FEED_VIEW_MODE',
    display: 'Toggle view grid mode',
  },
  {
    value: 'GO_TO_SETTINGS',
    display: 'Go to settings',
  },
];

const OPTIONS = [...GENERIC_ACTIONS];

export const useActionHandler = ({
  selectedOption,
  updateSelectedOption,
  formState,
  modalState,
  feedContext,
  selectContext,
}: any) => {
  const match = useRouteMatch('*');

  const history = useHistory();
  const location = useLocation();

  const [deleteItems, { loading: isDeleting }] = useOptimisticDeleteManyItems(
    selectContext.selectedItems.length ? selectContext.selectedItems : [],
  );

  const cleanup = () => {
    updateSelectedOption(null);
    formState.reset();
    modalState.closeModal();
  };

  useEffect(() => {
    switch (selectedOption) {
      case 'GO_TO_SETTINGS': {
        cleanup();
        history.push({
          // @ts-ignore
          pathname: `${match.url}/settings`.replace('//', '/'),
          search: location.search,
        });
        break;
      }

      case 'TOGGLE_FEED_VIEW_MODE': {
        cleanup();
        feedContext.setMode(feedContext.mode === 'grid' ? 'list' : 'grid');
        break;
      }

      case 'DELETE_ITEM': {
        if (selectContext.selectedItems.length) {
          deleteItems();
        } else if (feedContext.cursorItemId) {
          deleteItems();
        }
      }
    }
  }, [selectedOption]);
};

export const Spotlight = () => {
  const [selectedOption, updateSelectedOption] = useState<string | null>(null);

  const formState = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const { getValues, watch, register } = formState;

  watch();
  const values = getValues();

  const feedContext = useContext(FeedContext);
  const { mode, setMode, cursorItemId } = feedContext;

  const selectContext = useContext(SelectContext);
  const { selectedItems, deselectAllItems } = selectContext;

  const modalState = useGlobalModal(ModalName.SPOTLIGHT_MODAL);

  const { isModalOpen, toggleModal, closeModal } = modalState;

  const inputRef = useRef(null);

  useHotKey('mod+k', toggleModal, { isGlobal: true });
  useHotKey('esc', closeModal, { isGlobal: true, shouldBind: isModalOpen });

  useEffect(() => {}, [selectedOption]);

  useActionHandler({
    selectedOption,
    updateSelectedOption,
    modalState,
    formState,
    feedContext,
    selectContext,
  });

  const options = OPTIONS.filter(
    item =>
      !values.search ||
      item.display.toLowerCase().includes(values.search.toLowerCase()),
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
    [values.search],
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
                        {...getItemProps({
                          key: item.value,
                          index,
                          item: item.value,
                          // @ts-ignore
                          backgroundColor:
                            highlightedIndex === index
                              ? 'rgba(87,24,255, 0.1)'
                              : 'white',
                          fontWeight:
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
