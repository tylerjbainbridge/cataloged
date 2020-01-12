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

  const toast = useToast();

  watch('href');

  const { href } = getValues();

  const { isModalOpen, openModal, toggleModal, closeModal } = useGlobalModal(
    ModalName.CREATE_LINK_MODAL,
  );

  useHotKey('c l', toggleModal);

  const [createLink, { loading }] = useMutation(CREATE_LINK_MUTATION, {
    variables: { href },
    refetchQueries: ['feed'],
    onCompleted: () => {
      cleanup();

      toast({
        title: 'Success',
        status: 'success',
        duration: 2000,
        position: 'top',
      });
    },
  });

  const onPaste = (e: any) => {
    const pastedText = (e.originalEvent || e).clipboardData.getData(
      'text/plain',
    );

    if (pastedText) {
      setValue('href', pastedText);
    }
  };

  usePaste({ onPaste });

  const cleanup = () => {
    closeModal();
    setValue('href', '');
  };

  return (
    <>
      <Tooltip
        hasArrow
        placement="bottom"
        label="or press c + l"
        aria-label="Add link"
      >
        <Button cursor="pointer" variant="solid" onClick={openModal}>
          <Icon name="link" />
        </Button>
      </Tooltip>

      <Modal
        onClose={cleanup}
        scrollBehavior="inside"
        closeOnEsc={false}
        isOpen={isModalOpen}
      >
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(async (data, e) => {
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
              <Input name="href" id="href" defaultValue={href} ref={register} />
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
