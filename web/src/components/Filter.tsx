import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Tooltip,
  Box,
} from '@chakra-ui/core';
import { Labels } from './Labels';
import {
  getFilterVariablesFromFormValues,
  getFormValuesFromFilterVariables,
} from '../util/helpers';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';

const INITIAL_VALUES = {
  search: '',
  labels: [],
};

export const Filter = ({
  filter,
  variables,
}: {
  filter: any;
  variables: any;
}) => {
  const { isModalOpen, openModal, closeModal } = useGlobalModal(
    ModalName.FILTER_FEED_MODAL,
  );

  const [state, setState] = useState(INITIAL_VALUES);

  const { user } = useAuth();

  const formValues = getFormValuesFromFilterVariables(variables, user);

  const { search, labels } = state;

  useEffect(() => {
    if (isModalOpen) {
      setState(formValues);
    }
  }, [isModalOpen]);

  return (
    <>
      <Tooltip
        hasArrow
        placement="bottom"
        label="⌘ + ⌘"
        aria-label="Filter feed"
      >
        <Button
          cursor="pointer"
          leftIcon="search"
          variant="outline"
          onClick={openModal}
        >
          Filter
        </Button>
      </Tooltip>

      <Modal
        isCentered
        isOpen={isModalOpen}
        onClose={closeModal}
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent rounded="lg">
          <ModalBody>
            <Box p={5}>
              <FormControl mb={5}>
                <FormLabel>Search</FormLabel>
                <Input
                  name="search"
                  defaultValue=""
                  value={state.search}
                  onChange={(e: any) => {
                    setState({
                      ...state,
                      search: e.target.value,
                    });
                  }}
                />
                <FormHelperText id="email-helper-text">
                  Note content, file name, URL domain, etc.
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Labels</FormLabel>
                <Labels
                  selectedLabels={formValues.labels}
                  onSelectedLabelChange={(selectedLabels: any) => {
                    setState({
                      ...state,
                      labels: selectedLabels,
                    });
                  }}
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              color="green"
              cursor="pointer"
              mr={3}
              onClick={async () => {
                await filter(getFilterVariablesFromFormValues(INITIAL_VALUES));
                closeModal();
              }}
            >
              Reset
            </Button>
            <Button
              color="green"
              cursor="pointer"
              onClick={async () => {
                await filter(
                  getFilterVariablesFromFormValues({ labels, search }),
                );
                closeModal();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
