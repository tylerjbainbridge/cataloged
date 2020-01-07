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
import { feed_items, feed_items_file } from '../graphql/__generated__/feed';

export interface ItemWithFile extends feed_items {
  file: feed_items_file;
}

export const FileModal = ({
  item,
  children,
}: {
  item: ItemWithFile;
  children?: (childProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { file } = item;

  return (
    <>
      {children && children({ isOpen, onOpen, onClose })}

      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
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
