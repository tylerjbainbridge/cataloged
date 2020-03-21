import React, { useEffect, useRef, useState } from 'react';
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
  Tooltip,
  useToast,
} from '@chakra-ui/core';
import copy from 'copy-to-clipboard';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import Iframe from 'react-iframe';
import { useForm } from 'react-hook-form';
// @ts-ignore
import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
import YouTube from 'react-youtube';
import InstagramEmbed from 'react-instagram-embed';

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
import { useMedia } from 'react-use';
import { getTweetMetaFromUrl, getYoutubeId } from '../util/link';
import { FaCopy } from 'react-icons/fa';

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
  const editState = useDisclosure(false);
  const isMobile = useMedia('(max-width: 768px)');

  const { link } = item;

  const { getValues, setValue, watch, errors, register } = useForm<
    UpdateLinkFormValues
  >({
    validationSchema: CreateLinkSchema,
    mode: 'onBlur',
  });

  const toast = useToast();

  watch();

  const values = getValues();

  // useEffect(() => {
  //   fetch(link.href).catch(e => {
  //     editState.onOpen();
  //   });
  // }, [link.href]);

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
  }, [editState.isOpen]);

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

  let leftNode = null;
  const url = new URL(link.href);
  const leftContainerProps: any = {};

  console.log(url);

  if (!link.isIframeDisabled) {
    leftNode = (
      <Box
        d="flex"
        width={isMobile ? '100%' : 'calc(100% - 450px)'}
        justifyContent="center"
        height="100%"
      >
        <Iframe
          url={link.href}
          width="100%"
          height="100%"
          id="myId"
          // @ts-ignore
          onLoad={(e: any) => console.log(e)}
        />
      </Box>
    );
  } else if (url.hostname.includes('twitter.com')) {
    const meta = getTweetMetaFromUrl(link);

    if (!meta.id && meta.username) {
      drawerContentProps.maxWidth = '750px';

      leftNode = (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={meta.username}
          options={{ height: '100%', width: '100%' }}
        />
      );
    } else if (meta.id && meta.type === 'status') {
      drawerContentProps.maxWidth = '950px';

      leftNode = (
        <TwitterTweetEmbed tweetId={meta.id} options={{ width: '400px' }} />
      );
    }
  } else if (url.hostname.includes('youtube.com')) {
    const id = getYoutubeId(link.href);

    drawerContentProps.maxWidth = '1300px';

    if (id) {
      leftNode = <YouTube videoId={id} opts={{ width: '700px' }} />;
    }
  } else if (url.hostname.includes('instagram.com')) {
    drawerContentProps.maxWidth = '1000px';
    leftContainerProps.bg = '#fff';

    leftNode = (
      <InstagramEmbed url={link.href} maxWidth={600} containerTagName="div" />
    );
  }

  return (
    <>
      <DrawerContent
        key={item.id}
        width="100%"
        maxWidth={
          leftNode ? (link.isIframeDisabled ? '1000px' : '1300px') : '450px'
        }
        {...drawerContentProps}
      >
        {!isMobile && (
          <Box
            d="flex"
            width={isMobile ? '100%' : 'calc(100% - 450px)'}
            alignItems="center"
            justifyContent="center"
            height="100%"
            bg="#000"
            {...leftContainerProps}
          >
            {leftNode}
          </Box>
        )}
        <Flex
          width={isMobile ? '100%' : '450px'}
          minWidth={isMobile ? '100%' : '450px'}
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          p="20px"
          borderLeft="1px solid lightgray"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box height="100%">
            <Stack spacing="20px" height="100%">
              <Flex width="100%" justifyContent="flex-end">
                <Stack isInline>
                  <Box>
                    <Tooltip label="Copy URL" aria-label="copy url">
                      <Button
                        // width="100%"
                        mb="20px"
                        onClick={() => {
                          copy(link.href);
                          toast({
                            title: 'Copied to clipboard',
                            status: 'success',
                            duration: 2000,
                            position: 'bottom-left',
                          });
                        }}
                      >
                        <FaCopy />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Button
                    color="white"
                    bg="brand.purple.main"
                    // width="100%"
                    mb="20px"
                    onClick={() => window.open(link.href, '_blank')}
                  >
                    Visit site
                  </Button>

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
                        <MenuItem
                          d="flex"
                          alignItems="center"
                          onClick={editState.onToggle}
                        >
                          <Icon name="edit" fontSize="12px" mr="5px" />{' '}
                          {editState.isOpen ? 'View link' : 'Edit'}
                        </MenuItem>
                        {Object.values(menuNodes)}
                      </>
                    )}
                  </ItemActionMenu>
                </Stack>
              </Flex>
              <Stack spacing={5}>
                {link.image && (
                  <LazyImage
                    rounded
                    src={link.image}
                    height="150px"
                    objectFit="cover"
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
                      // roundedLeft="0"
                    >
                      Autofill
                    </InputLeftAddon>
                    <Input
                      name="href"
                      id="href"
                      roundedRight="md"
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
                  <FormErrorMessage>{errors?.href?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    name="title"
                    id="title"
                    defaultValue={link.title || ''}
                    ref={register}
                  />
                  <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
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
              </Stack>
            </Stack>
          </Box>
          <Box maxHeight="20%">
            <ItemDrawerMeta item={item} />
          </Box>
        </Flex>
      </DrawerContent>
    </>
  );
};
