import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Textarea,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
  InputRightAddon,
  InputLeftAddon,
  Tooltip,
} from '@chakra-ui/core';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Labels } from './Labels';
import { useForm } from 'react-hook-form';
import { LazyImage } from './LazyImage';
import {
  UPDATE_LINK_MUTATION,
  REFRESH_LINK_META_MUTATION,
} from 'cataloged-shared/graphql/link';
import { useDebounce } from 'cataloged-shared/hooks/useDebounce';
import {
  ItemFull,
  ItemFull_link,
} from 'cataloged-shared/graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';

export interface ItemWithLink extends ItemFull {
  link: ItemFull_link;
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

export const LinkModal = ({
  item,
  children,
  disclosure: parentDisclosure,
}: {
  item: ItemWithLink;
  disclosure?: Disclosure;
  children?: (childProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => any;
}) => {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = parentDisclosure || disclosure;

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
        console.log(data);
        setValue('href', data.refreshLinkMeta.href);
        setValue('title', data.refreshLinkMeta.title);
        setValue('description', data.refreshLinkMeta.title);
      },
    },
  );

  const debouncedUpdateLink = useDebounce(updateLink);

  const prevValues = useRef(values);

  useEffect(() => {
    if (isOpen) {
      setValue('href', link.href);
      setValue('title', link.title);
      setValue('description', link.description);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (!_.isEqual(prevValues.current, values) && values.href) {
        //@ts-ignore
        debouncedUpdateLink();
      }

      prevValues.current = values;
    }
  }, [values]);

  // Clean up and delete if needed.
  useEffect(
    () => () => {
      debouncedUpdateLink.cancel();
    },
    [],
  );

  const isSaving = isRefreshing || isUpdating;

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
        <ModalContent rounded="lg" maxWidth={500} maxHeight={700}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              {link.image && (
                <LazyImage
                  rounded="lg"
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
                  <InputRightAddon
                    as={Button}
                    cursor="pointer"
                    verticalAlign="middle"
                    // @ts-ignore
                    variant="outline"
                    onClick={() => window.open(link.href, '_blank')}
                    roundedRight="0"
                  >
                    Go
                  </InputRightAddon>
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
                <FormLabel htmlFor="title">Labels</FormLabel>
                <Labels item={item} numDisplayLabels={10} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="space-between" pt={5}>
            <Labels item={item} />
            <Box d="flex" alignItems="center">
              {isSaving ? <Spinner size="sm" /> : 'Up to date'}{' '}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
