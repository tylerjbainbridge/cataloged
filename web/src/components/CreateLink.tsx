import React, { useCallback, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as yup from 'yup';
import { usePaste } from '../hooks/usePaste';

import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Box,
  Button,
  Text,
  Icon,
  Tooltip,
  useToast,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/core';
import { useGlobalModal, ModalName } from './GlobalModal';
import { useHotKey } from '../hooks/useHotKey';
import { useGoToItem } from '../hooks/useGoTo';

const CreateLinkSchema = yup.object().shape({
  href: yup
    .string()
    .url('Invalid URL')
    .required('Required'),
});

const CREATE_LINK_MUTATION = gql`
  mutation createLink($href: String!) {
    createLink(href: $href) {
      id
      href

      item {
        id
        type

        createdAt
        updatedAt
      }
    }
  }
`;

export const CreateLink = () => {
  const {
    getValues,
    setValue,
    handleSubmit,
    watch,
    register,
    errors,
  } = useForm({
    validationSchema: CreateLinkSchema,
    mode: 'onSubmit',
  });

  const inputRef = useRef(null);

  const toast = useToast();

  watch('href');

  const [goToItem] = useGoToItem();

  const { href } = getValues();

  const { isModalOpen, openModal, toggleModal, closeModal } = useGlobalModal(
    ModalName.CREATE_LINK_MODAL,
  );

  useHotKey('c l', toggleModal);

  const [createLink, { loading }] = useMutation(CREATE_LINK_MUTATION, {
    variables: { href },
    refetchQueries: ['feed'],
    onCompleted: data => {
      cleanup();

      toast({
        title: 'Success',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      goToItem(data?.createLink?.item);
    },
  });

  const onPaste = (e: any) => {
    const pastedText = (e.originalEvent || e).clipboardData.getData(
      'text/plain',
    );

    // if (pastedText) {
    //   setValue('href', pastedText);
    // }
  };

  usePaste({ onPaste });

  const cleanup = () => {
    closeModal();
    setValue('href', '');
  };

  return (
    <>
      <Modal
        onClose={cleanup}
        scrollBehavior="inside"
        isOpen={isModalOpen}
        initialFocusRef={inputRef}
      >
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(async (data, e: any) => {
            e.preventDefault();
            await createLink();
          })}
          height="250px"
        >
          <ModalHeader>Save link</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.href}>
              <FormLabel htmlFor="href">URL</FormLabel>
              <Input
                name="href"
                id="href"
                defaultValue={href}
                ref={(ref: any) => {
                  register(ref);
                  inputRef.current = ref;
                }}
              />
              <FormHelperText>
                Type, paste, or drag a URL into this window.
              </FormHelperText>
              <FormErrorMessage>
                {errors.href && 'Invalid URL'}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              isDisabled={!!(!href || errors.href)}
              type="submit"
              color={!href || errors.href ? 'yellow' : 'green'}
            >
              <Box alignItems="center">
                <Icon name="add" /> {!href ? 'Waiting for url...' : 'Add'}
              </Box>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
