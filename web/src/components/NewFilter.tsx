import React, { useContext, useEffect, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import _ from 'lodash';
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  Input,
  Box,
  IconButton,
  Flex,
  Select,
  ButtonGroup,
  Switch,
  InputProps,
  BoxProps,
  Tooltip,
  useDisclosure,
  Text,
} from '@chakra-ui/core';
import { FeedContext } from './Feed';
import {
  getFilterVariablesFromFormValues,
  randomString,
  getQueryStringFromFilters,
} from '../util/helpers';
import { useDeepCompareEffect } from 'react-use';
import { useHotKey } from '../hooks/useHotKey';
import { Labels } from './Labels';
import { useGlobalModal } from './GlobalModal';
import { useAuth } from '../hooks/useAuth';
import { FaFilter } from 'react-icons/fa';

// Dynamic set of inputs

export interface NewFilterProps {
  variables: any;
  loading: boolean;
}

export const FORM_NAME = 'filters';

// export const FILTERS = ['where.type', 'search'];

export const FILTER_CONFIGS = {
  // Search
  search: {
    type: 'text',
    displayName: 'any',
    operators: ['contains', 'equals'],
    defaults: {
      value: '',
      operator: 'contains',
    },
  },
  // Type
  type: {
    type: 'select',
    displayName: 'type',
    operators: ['equals', 'not'],
    defaults: {
      value: undefined,
      operator: 'equals',
    },
    options: [[undefined, 'all'], 'file', 'note', 'link'],
  },
  // Status
  status: {
    type: 'select',
    displayName: 'status',
    operators: ['equals', 'not'],
    defaults: {
      value: 'NOT_STARTED',
      operator: 'equals',
    },
    options: [
      ['NOT_STARTED', 'not started'],
      ['IN_PROGRESS', 'in progress'],
      ['DONE', 'done'],
    ],
  },
  // Is favorited
  isFavorited: {
    type: 'switch',
    displayName: 'is favorited',
    operators: [],
    defaults: {
      value: true,
      operator: 'equals',
    },
  },
  // Labels
  labels: {
    type: 'labels',
    displayName: 'labels',
    operators: [
      // 'every', 'some', 'none'
      ['some', 'all'],
      'none',
    ],
    defaults: {
      values: [],
      operator: 'some',
    },
  },
};

export const FilterInput = ({
  uniqueId,
  remove,
  onChange: _onChange,
  value: filter,
}: any) => {
  const { user } = useAuth();

  // @ts-ignore
  const filterConfig = FILTER_CONFIGS[filter.name];

  const updateFilter = (updatedFilter: any) =>
    _onChange({
      ...filter,
      ...updatedFilter,
    });

  let valueNode = null;

  const styleProps: any = {
    cursor: 'pointer',
    variant: 'flushed',
  };

  const valueInputProps: any = {
    id: `field-${uniqueId}`,
  };

  switch (filterConfig.type) {
    case 'select': {
      // @ts-ignore
      const options = filterConfig.options.map(option =>
        Array.isArray(option) ? option : [option, option],
      );

      valueNode = (
        <Select
          {...styleProps}
          {...valueInputProps}
          mb={0}
          value={filter.value}
          onChange={(e: any) => {
            updateFilter({ value: e.target.value });
          }}
        >
          {options.map(
            // @ts-ignore
            ([value, text]) => (
              <option value={value} key={value}>
                {text}
              </option>
            ),
          )}
        </Select>
      );
      break;
    }

    case 'switch': {
      valueNode = (
        <Switch
          {...valueInputProps}
          isChecked={filter.value}
          onChange={(e: any) => {
            updateFilter({ value: e.target.checked });
          }}
        />
      );

      break;
    }

    case 'labels': {
      valueNode = (
        <Labels
          canAddLabels={false}
          selectedLabels={filter.values.map((name: string) =>
            user.labels.find(label => label.name === name),
          )}
          onSelectedLabelChange={(selectedLabels: any) => {
            updateFilter({
              values: selectedLabels.map(({ name }: any) => name),
            });
          }}
        />
      );
      break;
    }

    case 'text': {
      valueNode = (
        <Input
          {...styleProps}
          {...valueInputProps}
          variant="filled"
          mb={0}
          value={filter.value}
          onChange={(e: any) => {
            updateFilter({ value: e.target.value });
          }}
        />
      );
      break;
    }
  }

  return (
    <Flex mb={4} alignItems="center">
      <IconButton
        icon="delete"
        mr={2}
        aria-label="remove filter"
        onClick={remove}
        variant="ghost"
      />
      <Select
        variant="flushed"
        cursor="pointer"
        mb={0}
        mr={2}
        minWidth="100px"
        maxWidth="100px"
        value={filter.name}
        onChange={(e: any) => {
          const name = e.target.value;

          // @ts-ignore
          const newFieldConfig = FILTER_CONFIGS[name];

          return _onChange({
            name,
            ...newFieldConfig.defaults,
          });
        }}
      >
        {Object.entries(FILTER_CONFIGS).map(
          // @ts-ignore
          ([name, value]) => (
            <option value={name} key={name}>
              {value.displayName}
            </option>
          ),
        )}
      </Select>
      {!!filterConfig.operators.length && (
        <Select
          cursor="pointer"
          variant="flushed"
          mb={0}
          mr={2}
          minWidth="100px"
          maxWidth="100px"
          value={filter.operator}
          onChange={(e: any) => {
            updateFilter({ operator: e.target.value });
          }}
        >
          {filterConfig.operators
            .map((option: any) =>
              Array.isArray(option) ? option : [option, option],
            )
            // @ts-ignore
            .map(([value, text]) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))}
        </Select>
      )}
      {valueNode}
    </Flex>
  );
};

export const NewFilter = ({ variables, loading }: NewFilterProps) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const { filter } = useContext(FeedContext);

  const { isAnyModalOpen } = useGlobalModal();

  const modeForm = useForm({
    defaultValues: {},
  });

  const filterForm = useForm({
    defaultValues: {
      [FORM_NAME]: variables.filters || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: filterForm.control, // control props comes from useForm (optional: if you are using FormContext)
    name: FORM_NAME, // unique name for your Field Array
  });

  const addButtonRef = useRef(null);

  const { current: debouncedFilter } = useRef(
    _.debounce(async (values: any) => {
      const filters = getFilterVariablesFromFormValues(
        // @ts-ignore
        !values[FORM_NAME] ? Object.values(values) : values[FORM_NAME],
      );

      if (!_.isEqual(filters, variables.filters)) {
        console.log('updating', filters, variables.filters);
        await filter({ filters });
      }
    }, 1000),
  );

  filterForm.watch();

  const values = filterForm.getValues();

  const getName = (index: number) => `${FORM_NAME}[${index}]`;

  // useEffect(() => {
  //   append({ name: randomString() });
  // }, []);

  useDeepCompareEffect(() => {
    debouncedFilter.cancel();
    debouncedFilter(values);
  }, [values, fields.length]);

  useHotKey('/', onToggle, {
    isGlobal: true,
    shouldBind: !isAnyModalOpen,
  });

  useEffect(() => {
    if (isOpen) {
      console.log('initializing', variables?.filters);

      filterForm.reset({
        [FORM_NAME]: variables?.filters || [],
      });
    }
  }, [isOpen]);

  const trigger = (
    <Button
      cursor="pointer"
      variant="outline"
      bg="#F9F5FE"
      color="brand.purple"
      _hover={{ bg: '#e8e4ed', borderColor: 'brand.purple' }}
      size="md"
      border="none"
      isLoading={loading && !!variables?.filters?.length}
      isDisabled={false}
      onClick={e => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <Box mr={2}>
        <FaFilter size={12} />
      </Box>
      Filter
      {!!fields.length && ` (${fields.length})`}
    </Button>
  );

  return (
    <Popover
      //@ts-ignore
      // usePortal
      closeOnBlur
      closeOnEsc
      isOpen={isOpen}
      // isOpen
      onClose={onClose}
      initialFocusRef={addButtonRef}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent minWidth={fields.length ? 500 : 300} zIndex={500}>
        <PopoverArrow />
        <PopoverBody>
          <Stack spacing={1}>
            {!fields.length && (
              <Text alignSelf="center" color="gray.500">
                No filters applied
              </Text>
            )}
            {fields.map((field: any, index: number) => {
              const name = getName(index);

              // @ts-ignore
              const value = values[name] || values[FORM_NAME]?.[index];

              return (
                <Box key={field.id}>
                  <Controller
                    control={filterForm.control}
                    name={name}
                    uniqueId={field.name}
                    as={<FilterInput />}
                    remove={() => remove(index)}
                    defaultValue={
                      // @ts-ignore
                      value || {
                        name: 'search',
                        operator: 'contains',
                        value: '',
                      }
                    }
                    onChange={([value]) => ({
                      value,
                    })}
                  />
                </Box>
              );
            })}
            <Stack
              isInline
              d="flex"
              width="100%"
              justifyContent={fields.length ? 'space-between' : 'flex-end'}
            >
              {!!fields.length && (
                <Button
                  variant="ghost"
                  type="button"
                  color="gray"
                  onClick={async () => {
                    await filter({ filters: [] });
                    remove();
                    filterForm.reset({ [FORM_NAME]: [] });
                    // onClose();
                  }}
                >
                  Clear
                </Button>
              )}
              <Tooltip hasArrow label="Add filter" aria-label="add filter">
                <IconButton
                  icon="add"
                  aria-label="add filter"
                  variant="ghost"
                  type="button"
                  alignSelf="flex-end"
                  ref={addButtonRef}
                  onClick={() => append({ name: randomString() })}
                />
              </Tooltip>
            </Stack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
