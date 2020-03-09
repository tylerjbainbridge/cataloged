import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Textarea,
  InputGroup,
  Button,
  InputRightAddon,
  InputLeftAddon,
  DrawerContent,
  Flex,
  Divider,
  MenuItem,
  Icon,
  useDisclosure,
  IconButton,
} from '@chakra-ui/core';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useMedia } from 'react-use';
import Iframe from 'react-iframe';

import { Labels } from './Labels';
import { LazyImage } from './LazyImage';
import {
  UPDATE_LINK_MUTATION,
  REFRESH_LINK_META_MUTATION,
} from '../graphql/link';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { ItemActionMenu } from './ItemActionMenu';
import { ItemFull_link, ItemFull } from '../graphql/__generated__/ItemFull';
import { useDebouncedUpdate } from '../hooks/useDebouncedUpdate';
import { ItemDrawerMeta } from './ItemDrawerMeta';
import { ItemStatusInput } from './ItemStatusInput';

export interface ItemWithLink extends ItemFull {
  link: ItemFull_link;
}

export interface LinkDrawerProps extends ItemDrawerProps {
  item: ItemWithLink;
}

const CreateLinkSchema = yup.object().shape({
  href: yup
    .string()
    .url('Invalid URL')
    .required('Required'),
});

export interface UpdateLinkFormValues {
  href: string | null;
  title: string | null;
  description: string | null;
}

export const LinkDrawer = ({
  item,
  onClose,
  drawerContentProps,
}: LinkDrawerProps) => {
  const infoMenuState = useDisclosure(false);

  const isMobile = useMedia('(max-width: 768px)');

  const { link } = item;

  const { getValues, setValue, watch, errors, register } = useForm<
    UpdateLinkFormValues
  >({
    validationSchema: CreateLinkSchema,
    mode: 'onBlur',
  });

  watch();

  const values = getValues();

  const [updateLink, { loading: isUpdating }] = useMutation(
    UPDATE_LINK_MUTATION,
    {
      variables: { linkId: link.id, ...values },
    },
  );

  const [refreshLinkMeta, { loading: isRefreshing }] = useMutation(
    REFRESH_LINK_META_MUTATION,
    {
      variables: {
        linkId: link.id,
        href: values.href,
      },
      onError: console.log,
      onCompleted: data => {
        setValue('href', data.refreshLinkMeta.href);
        setValue('title', data.refreshLinkMeta.title);
        setValue('description', data.refreshLinkMeta.title);
      },
    },
  );

  useEffect(() => {
    setValue('href', link.href);
    setValue('title', link.title);
    setValue('description', link.description);
  }, []);

  useDebouncedUpdate(
    updateLink,
    { linkId: link.id, ...values },
    {
      skipIfEqualTo: {
        href: link.href,
        title: link.title,
        description: link.description,
      },
    },
  );

  return (
    <>
      <DrawerContent width="100vw" bg="black" {...drawerContentProps}>
        <Flex
          width="100%"
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          // p="20px"
          borderLeft="1px solid lightgray"
          justifyContent="space-between"
          flexDirection="column"
          overflowY="scroll"
        >
          <Box d="flex" maxWidth="100%" height="100%" bg="black" p="0px">
            {(!isMobile || !infoMenuState.isOpen) && (
              <Box
                d="flex"
                height="100vh"
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
                <Box d="flex" justifyContent="center" width="70%" height="100%">
                  <Iframe
                    url={link.href}
                    width="100%"
                    height="100%"
                    // id="myId"
                    // className="myClassname"
                    // display="initial"
                    // position="relative"
                  />
                </Box>
              </Box>
            )}
            {!isMobile || infoMenuState.isOpen} && (
            <Box
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
                  <Flex width="100%" justifyContent="flex-end">
                    <ItemActionMenu item={item}>
                      {menuNodes => (
                        <>
                          <MenuItem
                            d="flex"
                            alignItems="center"
                            onClick={onClose}
                          >
                            <Icon name="close" fontSize="12px" mr="5px" /> Close
                          </MenuItem>
                          {Object.values(menuNodes)}
                        </>
                      )}
                    </ItemActionMenu>
                  </Flex>
                  <Stack spacing={5}>
                    {link.image && (
                      <LazyImage
                        rounded
                        src={link.image}
                        height="200px"
                        objectFit="cover"
                        pt={5}
                        pb={5}
                      />
                    )}
                    <FormControl>
                      <FormLabel htmlFor="href">URL</FormLabel>
                      <InputGroup size="md">
                        <InputLeftAddon
                          as={Button}
                          cursor="pointer"
                          verticalAlign="middle"
                          // @ts-ignore
                          variant="outline"
                          isDisabled={isRefreshing}
                          isLoading={isRefreshing}
                          onClick={() => refreshLinkMeta()}
                          roundedLeft="0"
                        >
                          Autofill
                        </InputLeftAddon>
                        <Input
                          name="href"
                          id="href"
                          rounded="0"
                          defaultValue={link.href}
                          ref={register}
                        />
                        {/* <InputRightAddon
                      as={Button}
                      cursor="pointer"
                      verticalAlign="middle"
                      // @ts-ignore
                      variant="outline"
                      onClick={() => window.open(link.href, '_blank')}
                      roundedRight="0"
                    >
                      Go
                    </InputRightAddon> */}
                      </InputGroup>
                      <FormErrorMessage>
                        {errors?.href?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input
                        name="title"
                        id="title"
                        defaultValue={link.title || ''}
                        ref={register}
                      />
                      <FormErrorMessage>
                        {errors?.title?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Textarea
                        name="description"
                        id="description"
                        size="md"
                        defaultValue={link.description || ''}
                        ref={register}
                      />
                      <FormErrorMessage>
                        {errors?.description?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="status">Status</FormLabel>
                      <ItemStatusInput item={item} size="md" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="labels">Labels</FormLabel>
                      <Labels item={item} numDisplayLabels={10} />
                    </FormControl>
                    <Divider />
                    <Button
                      color="white"
                      bg="brand.purple.main"
                      width="100%"
                      mb="20px"
                      onClick={() => window.open(link.href, '_blank')}
                    >
                      Visit site
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <ItemDrawerMeta item={item} />
            </Box>
            )
          </Box>
        </Flex>
      </DrawerContent>
    </>
  );
};
