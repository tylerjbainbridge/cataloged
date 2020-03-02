import React, { useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useToast,
  ModalOverlay,
  useDisclosure,
  Box,
} from '@chakra-ui/core';
import gql from 'graphql-tag';

import { FaSave } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GET_SAVED_SEARCHES_QUERY } from './SidebarMenu';

const ADD_OR_UPDATE_SAVED_SEARCH = gql`
  mutation addOrUpdateSavedSearch(
    $savedSearchId: String
    $name: String!
    $filters: [FilterInput!]!
  ) {
    addOrUpdateSavedSearch(
      savedSearchId: $savedSearchId
      name: $name
      filters: $filters
    ) {
      id
      name

      filters {
        name
        value
        values
      }
    }
  }
`;

export const AddOrUpdateSavedSearch = ({ filters, children }: any) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const { register, watch, getValues, reset } = useForm();

  watch();

  const values = getValues();
  const toast = useToast();

  const { data } = useQuery(GET_SAVED_SEARCHES_QUERY);

  const [addOrUpdateSavedSearch, { loading: isWorking }] = useMutation(
    ADD_OR_UPDATE_SAVED_SEARCH,
    {
      refetchQueries: ['getSavedSearches'],
      onCompleted: () => {
        onClose();
        reset();

        toast({
          title: 'Success',
          status: 'success',
          duration: 2000,
          position: 'bottom-left',
        });
      },
    },
  );

  const match = useRouteMatch('/search/:id');

  const inputRef = useRef(null);

  const activeSearch = (data?.savedSearches || []).find(
    // @ts-ignore
    savedSearch => match?.params?.id === savedSearch.id,
  );

  return (
    <>
      {children({ isOpen, onClose, onOpen, onToggle, match })}
      <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent rounded="lg" height="250px">
          <ModalHeader>Save this search</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb="10px">
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                name="name"
                id="name"
                defaultValue={activeSearch?.name || ''}
                ref={(ref: any) => {
                  register(ref);
                  inputRef.current = ref;
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Box d="flex" width="100%" justifyContent="space-between">
              {activeSearch ? (
                <Button
                  isDisabled={isWorking || !filters.length}
                  onClick={() => {
                    addOrUpdateSavedSearch({
                      variables: {
                        savedSearchId: activeSearch.id,
                        name: values.name,
                        filters,
                      },
                    });
                  }}
                >
                  Update
                </Button>
              ) : (
                <Box />
              )}
              <Button
                isDisabled={isWorking || !filters.length}
                onClick={() => {
                  addOrUpdateSavedSearch({
                    variables: {
                      name: values.name,
                      filters,
                    },
                  });
                }}
              >
                Create new
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
