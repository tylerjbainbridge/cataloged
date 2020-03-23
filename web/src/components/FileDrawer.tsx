import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import {
  Stack,
  Box,
  DrawerContent,
  Text,
  IconButton,
  MenuItem,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Icon,
  useDisclosure,
  Divider,
  Button,
} from '@chakra-ui/core';
import { useMedia } from 'react-use';
import { LazyImage } from './LazyImage';

import {
  ItemFull_file,
  ItemFull,
} from 'cataloged-shared/graphql/__generated__/ItemFull';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { Labels } from './Labels';
import { ItemActionMenu } from './ItemActionMenu';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_FILE_MUTATION } from 'cataloged-shared/graphql/file';
import { useDebouncedUpdate } from 'cataloged-shared/hooks/useDebouncedUpdate';
import { ItemDrawerMeta } from './ItemDrawerMeta';
import { ItemStatusInput } from './ItemStatusInput';
import { isFileImage } from '../../../shared/util/itemHelpers';
import { downloadFile } from 'cataloged-shared/util/helpers';

export interface ItemWithFile extends ItemFull {
  file: ItemFull_file;
}

export interface FileDrawerProps extends ItemDrawerProps {
  item: ItemWithFile;
}

export interface UpdateFileFormValues {
  title: string | null;
  description: string | null;
}

export const FileDrawer = ({
  item,
  onClose,
  drawerContentProps,
}: FileDrawerProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const infoMenuState = useDisclosure();

  const { file } = item;

  const { getValues, setValue, watch, errors, register } = useForm<
    UpdateFileFormValues
  >({
    mode: 'onBlur',
  });

  const values = getValues();

  watch();

  const [updateFile, { loading: isUpdating, data }] = useMutation(
    UPDATE_FILE_MUTATION,
  );

  useEffect(() => {
    setValue('title', file.title);
    setValue('description', file.description);
  }, []);

  useDebouncedUpdate(
    updateFile,
    { fileId: file.id, ...values },
    {
      skipIfEqualTo: { title: file.title, description: file.description },
    },
  );

  const width = isFileImage(file) ? '100vw' : '350px';

  return (
    <DrawerContent
      key={item.id}
      height="100%"
      width={width}
      bg="black"
      {...drawerContentProps}
    >
      <Box d="flex" maxWidth="100%" height="100%" bg="black" p="0px">
        {isFileImage(file) && (!isMobile || !infoMenuState.isOpen) && (
          <Box
            d="flex"
            width={isMobile ? '100%' : 'calc(100% - 350px)'}
            justifyContent="center"
            alignItems="center"
          >
            <Box position="fixed" top="0px" left="0" p="10px">
              <IconButton
                icon="arrow-back"
                aria-label="arrow-back"
                color="white"
                variant="ghost"
                fontSize="20px"
                cursor="pointer"
                onClick={onClose}
              />
            </Box>
            <Box position="fixed" top="0px" right="0" p="10px">
              <IconButton
                icon="info"
                aria-label="info"
                color="white"
                variant="ghost"
                fontSize="20px"
                cursor="pointer"
                onClick={infoMenuState.onOpen}
              />
            </Box>
            <LazyImage
              rounded
              isReady={!!file.isUploaded}
              src={file.fullUrl}
              width="100%"
              maxHeight="100%"
              objectFit="scale-down"
            />
          </Box>
        )}
        {(!isMobile || infoMenuState.isOpen) && (
          <Flex
            width={isMobile ? '100%' : '350px'}
            minWidth={isMobile ? '100%' : '350px'}
            float="right"
            height="100%"
            bg="white"
            position="fixed"
            right="0"
            p="20px"
            justifyContent="space-between"
            flexDirection="column"
            overflowY="auto"
          >
            <Box>
              <Stack spacing="20px">
                <Flex
                  width="100%"
                  justifyContent={isMobile ? 'space-between' : 'flex-end'}
                >
                  {isMobile && (
                    <IconButton
                      icon="close"
                      aria-label="close"
                      variant="ghost"
                      fontSize="12px"
                      cursor="pointer"
                      // @ts-ignore
                      variant="outline"
                      onClick={infoMenuState.onClose}
                    />
                  )}
                  <ItemActionMenu item={item}>
                    {menuNodes => (
                      <>
                        <MenuItem
                          d="flex"
                          alignItems="center"
                          onClick={onClose}
                        >
                          <Icon name="close" fontSize="11px" mr="5px" /> Close
                        </MenuItem>
                        {Object.values(menuNodes)}
                      </>
                    )}
                  </ItemActionMenu>
                </Flex>
                {!!file.originalName && (
                  <FormControl>
                    <FormLabel htmlFor="title">Name</FormLabel>
                    <Text>{file.originalName}</Text>
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    name="title"
                    id="title"
                    defaultValue={file.title || ''}
                    ref={register}
                  />
                  <FormErrorMessage>
                    {
                      // @ts-ignore
                      errors?.title?.message
                    }
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    name="description"
                    id="description"
                    size="md"
                    defaultValue={file.description || ''}
                    ref={register}
                  />
                  <FormErrorMessage>
                    {
                      // @ts-ignore
                      errors?.description?.message
                    }
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="title">Status</FormLabel>
                  <ItemStatusInput item={item} size="md" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="labels">Labels</FormLabel>
                  <Labels item={item} numDisplayLabels={10} />
                  <FormErrorMessage>
                    {
                      // @ts-ignore
                      errors?.description?.message
                    }
                  </FormErrorMessage>
                </FormControl>
                <Divider />
                <Button
                  as="a"
                  color="white"
                  bg="brand.purple.main"
                  width="100%"
                  mb="20px"
                  cursor="pointer"
                  onClick={() => {
                    // if (!file.contentType) window.open(file.originalUrl);

                    downloadFile(
                      file.originalUrl,
                      file.originalName,
                      // @ts-ignore
                      file.contentType,
                    );
                  }}
                >
                  Download file
                </Button>
              </Stack>
            </Box>
            <Box maxHeight="40%">
              <ItemDrawerMeta item={item} />
            </Box>
          </Flex>
        )}
      </Box>
    </DrawerContent>
  );
};
