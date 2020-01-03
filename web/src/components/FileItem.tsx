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
  Text,
} from '@chakra-ui/core';
import { Labels } from './Labels';
import { feed_items } from './__generated__/feed';
import { ITEM_ACTUAL_WIDTH, ItemHeader, ItemContentContainer } from './Item';

export interface ItemWithFile extends feed_items {
  file: feed_items_file;
}

export const FileItem = ({ item }: { item: ItemWithFile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const { file } = item;

  return (
    <>
      <ItemContentContainer item={item} tooltip="Open file">
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
        <ItemHeader item={item} onSingleClick={onOpen}>
          {file.name}.{file.extension}
        </ItemHeader>
      </ItemContentContainer>
      <Modal
        size="100vw"
        onClose={onClose}
        scrollBehavior="inside"
        isOpen={isOpen}
        closeOnEsc={false}
        m={0}
      >
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader>
            {file.name}.{file.extension}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            justifyContent="center"
            flexWrap="wrap"
            alignItems="center"
          >
            {/* <Box
              p={5}
              d="flex"
              height="100%"
              justifyContent="center"
              width="70%"
            > */}
            <LazyImage
              rounded
              isReady={file.isUploaded}
              src={file.fullUrl}
              height="100%"
              // width="auto"
              maxWidth="100%"
              p={3}
            />
            {/* </Box> */}
            {/* <Box
              p={5}
              d="flex"
              pt={100}
              width="30%"
              height="100%"
              justifyContent="flex-start"
              flexWrap="wrap"
            >
              <Stack spacing={5}>
                <Text fontSize="xl" fontWeight="bold">
                  {file.name}.{file.extension}
                </Text>
                <Labels item={item} />
              </Stack>
            </Box> */}
          </ModalBody>
          <ModalFooter d="flex" justifyContent="center">
            <Box m={3}>
              <Labels item={item} />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
