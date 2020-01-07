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
    mode: 'onBlur',
  });

  watch('href');

  const { href } = getValues();

  const { isModalOpen, openModal, toggleModal, closeModal } = useGlobalModal(
    ModalName.CREATE_LINK_MODAL,
  );

  useHotKey('c l', toggleModal);

  const [createLink, { loading }] = useMutation(CREATE_LINK_MUTATION, {
    variables: { href },
    refetchQueries: ['feed'],
    onCompleted: () => cleanup(),
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

        <ModalContent height="250px">
          <ModalHeader>Paste link</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form
              onSubmit={handleSubmit(async () => {
                await createLink();
              })}
            >
              <Box display="none">
                <input name="href" defaultValue="" ref={register} />
                {errors.href && <Text color="red">{errors?.href}</Text>}
              </Box>

              {href && (
                <Box width="100%">
                  <a href={href} target="_blank">
                    {href}
                  </a>
                </Box>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              isDisabled={!href}
              onClick={async () => {
                if (!loading) {
                  await createLink();
                }
              }}
              color={!href ? 'yellow' : 'green'}
            >
              <Box alignItems="center">
                <Icon name="add" /> {!href ? 'Waiting for link...' : 'Add'}
              </Box>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
