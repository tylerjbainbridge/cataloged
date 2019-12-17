// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { getItems_items, getItems_items_file } from './__generated__/getItems';
import { ItemHeader } from './ItemHeader';
import {
  useDisclosure,
  SlideIn,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Box,
  Button,
} from '@chakra-ui/core';

export interface ItemWithFile extends getItems_items {
  file: getItems_items_file;
}

export const File = ({ item }: { item: ItemWithFile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const { file } = item;

  return (
    <div>
      <SelectOnClick onSingleClick={onOpen} item={item}>
        {({ style, ...clickProps }) => (
          <LazyImage
            {...style}
            isReady={file.isUploaded}
            src={
              !file.isUploaded
                ? 'https://react.semantic-ui.com/images/wireframe/image.png'
                : file.squareUrl
            }
            {...clickProps}
          />
        )}
      </SelectOnClick>
      <ItemHeader onSingleClick={onOpen}>
        {file.name}.{file.extension}
      </ItemHeader>
      <Modal
        size="full"
        onClose={onClose}
        scrollBehavior="inside"
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent height="100%">
          <ModalHeader>
            {file.name}.{file.extension}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" justifyContent="center" alignItems="center">
            <LazyImage
              rounded
              isReady={file.isUploaded}
              src={file.fullUrl}
              height="90%"
              width="auto"
              showSpinner={false}
              loadingContainerProps={{
                width: '100%',
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
