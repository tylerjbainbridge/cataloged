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
} from '@chakra-ui/core';
import { Labels } from './Labels';
import {
  getFilterVariablesFromFormValues,
  getFormValuesFromFilterVariables,
} from '../util/helpers';
import { useAuth } from '../hooks/useAuth';

export const Filter = ({
  filter,
  variables,
}: {
  filter: any;
  variables: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const formValues = getFormValuesFromFilterVariables(variables, user);

  const { getValues, watch, register, setValue, reset } = useForm({
    defaultValues: {
      search: '',
      labels: [],
    },
  });

  watch();

  useEffect(() => {
    register({ name: 'labels' });
  }, [register]);

  const { search, labels } = getValues();

  return (
    <>
      <Button
        cursor="pointer"
        leftIcon="search"
        variant="outline"
        onClick={() => setIsModalOpen(true)}
      >
        Filter
      </Button>

      <Modal
        isCentered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent rounded="lg">
          <ModalBody>
            {isModalOpen && (
              <>
                <FormControl mb={5}>
                  <FormLabel>Search</FormLabel>
                  <Input name="search" defaultValue="" ref={register} />
                  <FormHelperText id="email-helper-text">
                    Note content, file name, URL domain, etc.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Labels</FormLabel>
                  <Labels
                    selectedLabels={formValues.labels}
                    onSelectedLabelChange={(selectedLabels: any) => {
                      setValue('labels', selectedLabels);
                    }}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="green"
              cursor="pointer"
              onClick={async () => {
                await filter(getFilterVariablesFromFormValues({ labels }));
                setIsModalOpen(false);
                reset();
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
