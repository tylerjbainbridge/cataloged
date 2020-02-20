import React, { useRef, useState } from 'react';

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

const OPTIONS = ['Open', 'Delete', 'Label', 'Go to link'];

export const Spotlight = () => {
  // const [] = useState()

  const {
    getValues,
    setValue,
    handleSubmit,
    watch,
    register,
    errors,
  } = useForm();

  const { isModalOpen, openModal, toggleModal, closeModal } = useGlobalModal(
    ModalName.SPOTLIGHT_MODAL,
  );

  const inputRef = useRef(null);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: OPTIONS });

  useHotKey('mod+k', toggleModal, { isGlobal: true });

  return (
    <Modal
      onClose={closeModal}
      scrollBehavior="inside"
      // isOpen={isModalOpen || true}
      initialFocusRef={inputRef}
      size="full"
      isCentered
    >
      <ModalOverlay />

      <ModalContent as="form" height="300px" width="500px" rounded="lg">
        <ModalHeader>Cataloged</ModalHeader>
        <ModalCloseButton />

        <Downshift
          onChange={selection =>
            alert(
              selection
                ? `You selected ${selection.value}`
                : 'Selection Cleared',
            )
          }
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => {
            return (
              <ModalBody p="0px">
                <Box
                  // @ts-ignore
                  {...getRootProps({}, { suppressRefError: true })}
                >
                  <Input
                    size="lg"
                    name="href"
                    id="href"
                    width="100%"
                    variant="flushed"
                    placeholder="search commands"
                    pl="20px"
                    ref={(ref: any) => {
                      register(ref);
                      inputRef.current = ref;
                    }}
                    {...getInputProps()}
                  />
                </Box>
                <Box
                  {...getMenuProps()}
                  // @ts-ignore
                  width={inputRef?.current?.offsetWidth}
                  position="absolute"
                  zIndex={100}
                  backgroundColor="white"
                  rounded="lg"
                >
                  {OPTIONS.filter(
                    item => !inputValue || item.includes(inputValue),
                  ).map((item, index) => (
                    <Box
                      d="flex"
                      alignItems="center"
                      height="35px"
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        // @ts-ignore
                        backgroundColor:
                          highlightedIndex === index ? 'gray.100' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      })}
                      pl="20px"
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </ModalBody>
            );
          }}
        </Downshift>
      </ModalContent>
    </Modal>
  );
};
