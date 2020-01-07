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
import { useMutation } from '@apollo/react-hooks';
import { Labels } from './Labels';
import { useForm } from 'react-hook-form';
import { LazyImage } from './LazyImage';
import {
  UPDATE_LINK_MUTATION,
  REFRESH_LINK_META_MUTATION,
} from '../graphql/link';
import { feed_items_link, feed_items } from '../graphql/__generated__/feed';
import { useDebounce } from '../hooks/useDebounce';
// import { getMetadataFromUrl } from '../util/helpers';

export interface ItemWithLink extends feed_items {
  link: feed_items_link;
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
}: {
  item: ItemWithLink;
  children?: (childProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { link } = item;

  const { getValues, setValue, watch, errors, register } = useForm<
    UpdateLinkFormValues
  >({
    defaultValues: {
      href: link.href,
      title: link.title,
      description: link.description,
    },
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
      onCompleted: data => {
        setValue('title', data.refreshLinkMeta.title);
        setValue('description', data.refreshLinkMeta.title);
      },
    },
  );

  const debouncedUpdateLink = useDebounce(updateLink);

  const prevValues = useRef(values);

  useEffect(() => {
    if (isOpen) {
      if (
        !_.isEqual(prevValues.current, values) &&
        values.href &&
        values.title
      ) {
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
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent maxWidth={500} maxHeight={700}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  <Input name="href" id="href" rounded="0" ref={register} />
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
                <FormLabel htmlFor="href">Title</FormLabel>
                <Input name="title" id="title" ref={register} />
                <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="href">Description</FormLabel>
                <Textarea
                  name="description"
                  id="description"
                  size="md"
                  ref={register}
                />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="space-between" pt={5}>
            <Labels item={item} />
            <Box>{isSaving ? <Spinner size="sm" /> : 'Up to date'} </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
