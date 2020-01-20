import React, { useState, useEffect, useContext } from 'react';
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
  Select,
  Switch,
} from '@chakra-ui/core';
import { Labels } from './Labels';
import {
  getFilterVariablesFromFormValues,
  getFormValuesFromFilterVariables,
} from '../util/helpers';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';
import { useHotKey } from '../hooks/useHotKey';
import { FeedContext } from './Feed';

const INITIAL_VALUES = {
  search: '',
  labels: [],
  type: 'all',
  status: '',
  onlyFavorites: false,
};

export const Filter = ({ variables }: { variables: any }) => {
  const { filter } = useContext(FeedContext);

  const [state, setState] = useState(INITIAL_VALUES);

  const { user } = useAuth();

  const { isModalOpen, openModal, closeModal, toggleModal } = useGlobalModal(
    ModalName.FILTER_FEED_MODAL,
  );

  useHotKey('command command', toggleModal, { isGlobal: true });

  const formValues = getFormValuesFromFilterVariables(variables, user);

  useEffect(() => {
    if (isModalOpen) {
      setState(formValues);
    }
  }, [isModalOpen]);

  const reset = async () => {
    await filter(getFilterVariablesFromFormValues(INITIAL_VALUES));

    closeModal();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await filter(getFilterVariablesFromFormValues(state));

    closeModal();
  };

  return (
    <>
      <Tooltip
        hasArrow
        placement="bottom"
        label="or press ⌘ + ⌘"
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
        <ModalContent as="form" onSubmit={onSubmit} rounded="lg">
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
              <FormControl mb={5}>
                <FormLabel>Type</FormLabel>
                <Select
                  placeholder="Select type"
                  value={state.type}
                  onChange={(e: any) => {
                    setState({
                      ...state,
                      type: e.target.value,
                    });
                  }}
                >
                  {[
                    ['all', 'All'],
                    ['link', 'Links'],
                    ['file', 'Files'],
                    ['note', 'Notes'],
                  ].map(([value, text]) => (
                    <option value={value} key={value}>
                      {text}
                    </option>
                  ))}
                </Select>
                <FormHelperText id="email-helper-text">
                  File, link, note
                </FormHelperText>
              </FormControl>

              <FormControl mb={5}>
                <FormLabel>Status</FormLabel>
                <Select
                  placeholder="Select status"
                  value={state.status}
                  onChange={(e: any) => {
                    setState({
                      ...state,
                      status: e.target.value,
                    });
                  }}
                >
                  {[
                    ['NOT_STARTED', 'Not started'],
                    ['IN_PROGRESS', 'In progress'],
                    ['DONE', 'Done'],
                  ].map(([value, text]) => (
                    <option value={value} key={value}>
                      {text}
                    </option>
                  ))}
                </Select>
                <FormHelperText id="email-helper-text">
                  File, link, note
                </FormHelperText>
              </FormControl>

              <FormControl mb={5}>
                <FormLabel>Only favorites</FormLabel>
                <Box width="100%">
                  <Switch
                    isChecked={!!state.onlyFavorites}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        onlyFavorites: e.target.checked,
                      });
                    }}
                  />
                </Box>
              </FormControl>

              <FormControl>
                <FormLabel>Labels</FormLabel>
                <Labels
                  canAddLabels={false}
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
              onClick={reset}
            >
              Reset
            </Button>
            <Button color="green" cursor="pointer" type="submit">
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
