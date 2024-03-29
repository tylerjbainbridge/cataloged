import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  Box,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/core';

import { Labels } from './Labels';
import { LazyImage } from './LazyImage';
import { Disclosure } from './GlobalModal';
import {
  ItemFull,
  ItemFull_file,
} from 'cataloged-shared/graphql/__generated__/ItemFull';

export interface ItemWithFile extends ItemFull {
  file: ItemFull_file;
}

export const FileModal = ({
  item,
  children,
  disclosure: parentDisclosure,
}: {
  item: ItemWithFile;
  disclosure?: Disclosure;
  children?: (childProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => any;
}) => {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = parentDisclosure || disclosure;

  const { file } = item;

  return (
    <>
      {children && children({ isOpen, onOpen, onClose })}

      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxWidth={1200}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" justifyContent="center">
            <LazyImage
              rounded
              isReady={!!file.isUploaded}
              src={file.fullUrl}
              maxWidth="100%"
              objectFit="scale-down"
              pt={5}
              pb={5}
            />
          </ModalBody>
          <ModalFooter justifyContent="flex-start">
            <Box mt={5}>
              <Labels item={item} />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
