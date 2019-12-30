// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
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
  Stack,
} from '@chakra-ui/core';
import { Labels } from './Labels';
import { feed_items } from './__generated__/feed';
import { ITEM_ACTUAL_WIDTH, ItemHeader } from './Item';

export interface ItemWithFile extends feed_items {
  file: feed_items_file;
}

export const FileItem = ({ item }: { item: ItemWithFile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const { file } = item;

  return (
    <>
      <SelectOnClick onSingleClick={onOpen} item={item}>
        {clickProps => (
          <LazyImage
            width={ITEM_ACTUAL_WIDTH}
            height="200px"
            objectFit="cover"
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
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent height="100%">
          <ModalHeader>
            {file.name}.{file.extension}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" justifyContent="center" alignItems="center">
            <Stack spacing={5} d="flex" height="100%">
              <LazyImage
                rounded
                isReady={file.isUploaded}
                src={file.fullUrl}
                height="90%"
                width="auto"
                loadingContainerProps={{
                  width: '100%',
                }}
              />
              <Labels item={item} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
