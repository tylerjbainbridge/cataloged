import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import {
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
  Button,
  Box,
  DrawerContent,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Icon,
} from '@chakra-ui/core';

import { LazyImage } from './LazyImage';

import { ItemFull_file, ItemFull } from '../graphql/__generated__/ItemFull';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { Labels } from './Labels';
import { FaEllipsisH } from 'react-icons/fa';
import { ItemActionMenu } from './ItemActionMenu';
import { useForm } from 'react-hook-form';
import { useDebounce } from '../hooks/useDebounce';
import { useMutation } from 'react-apollo';
import { UPDATE_FILE_MUTATION } from '../graphql/file';
import { useDebouncedUpdate } from '../hooks/useDebouncedUpdate';
import { ItemDrawerMeta } from './ItemDrawerMeta';

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
  isFullScreen,
  toggleFullScreen,
}: FileDrawerProps) => {
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

  console.log('mutation data', data);

  useEffect(() => {
    console.log('initializing values', file);
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

  return (
    <DrawerContent maxHeight="100vw" width="100vw" bg="black">
      <IconButton
        m="10px"
        p="10px"
        position="fixed"
        top="0"
        right="left"
        display="flex"
        onClick={onClose}
        size="sm"
        mr="10px"
        variantColor="white"
        aria-label="close"
        icon="close"
      />
      <Box d="flex" maxWidth="100%" height="100%" bg="black" p="0px">
        <Box
          d="flex"
          width="calc(100% - 350px)"
          justifyContent="center"
          alignItems="center"
        >
          <LazyImage
            rounded
            isReady={!!file.isUploaded}
            src={file.fullUrl}
            width="100%"
            maxHeight="100%"
            objectFit="scale-down"
          />
        </Box>
        <Flex
          width="350px"
          minWidth="350px"
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          p="20px"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box>
            <Flex width="100%" justifyContent="flex-end">
              <ItemActionMenu item={item}>
                {menuNodes => (
                  <>
                    <MenuItem d="flex" alignItems="center" onClick={onClose}>
                      <Icon name="close" fontSize="11px" mr="5px" /> Close
                    </MenuItem>
                    {Object.values(menuNodes)}
                  </>
                )}
              </ItemActionMenu>
            </Flex>
            <Stack spacing="20px">
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
                <FormLabel htmlFor="title">Labels</FormLabel>
                <Labels item={item} numDisplayLabels={10} />
                <FormErrorMessage>
                  {
                    // @ts-ignore
                    errors?.description?.message
                  }
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </Box>
          <ItemDrawerMeta item={item} />
        </Flex>
      </Box>
    </DrawerContent>
  );
};
