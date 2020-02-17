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
  Divider,
} from '@chakra-ui/core';
import { FeedContext } from './Feed';
import {
  getFilterVariablesFromFormValues,
  randomString,
  getQueryStringFromFilters,
  getFeedVariablesFromQueryString,
} from '../util/helpers';
import { useDeepCompareEffect, useMedia } from 'react-use';
import { useHotKey } from '../hooks/useHotKey';
import { Labels } from './Labels';
import { useGlobalModal } from './GlobalModal';
import { useAuth } from '../hooks/useAuth';
import { FaFilter, FaSave } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';
import { usePrevious } from '../hooks/usePrevious';
import { AddOrUpdateSavedSearch } from './AddOrUpdateSavedSearch';

// Dynamic set of inputs

export interface NewFilterProps {
  variables: any;
  loading: boolean;
  onDebouncedFilterChange: (filters: any[]) => void;
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
    options: [
      [undefined, 'all'],
      'file',
      'note',
      'link',
      ['googleContact', 'contact'],
    ],
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

  const isMobile = useMedia('(max-width: 768px)');

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
    ...(isMobile
      ? {
          width: '100%',
          mb: '10px',
        }
      : {
          width: '200px',
        }),
  };

  const valueInputProps: any = {
    id: `field-${uniqueId}`,
  };

  const commonProps = {};

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
          {...styleProps}
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
        <Box width="auto" {...styleProps}>
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
        </Box>
      );
      break;
    }

    case 'text': {
      valueNode = (
        <Input
          mb={0}
          width="200px"
          {...styleProps}
          {...valueInputProps}
          variant={!isMobile ? 'filled' : 'flushed'}
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
    <Flex
      width="100%"
      mb={4}
      alignItems="center"
      flexWrap="wrap"
      {...(isMobile
        ? {
            border: '1px solid lightgray',
            rounded: 'lg',
            padding: '10px',
          }
        : {})}
    >
      {!isMobile && (
        <IconButton
          icon="delete"
          mr={2}
          aria-label="remove filter"
          onClick={remove}
          variant="ghost"
        />
      )}
      <Select
        variant="flushed"
        cursor="pointer"
        {...(isMobile
          ? {
              mb: '10px',
              width: '100%',
            }
          : {
              mr: '10px',
              width: '100px',
            })}
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
          value={filter.operator}
          {...(isMobile
            ? {
                mb: '5px',
                width: '100%',
              }
            : {
                mr: '10px',
                width: '100px',
              })}
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
      {isMobile && (
        <Box width="100%">
          <Button width="100%" onClick={remove} variantColor="red">
            Remove
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export const Filter = ({
  variables,
  loading,
  onDebouncedFilterChange,
}: NewFilterProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const location = useLocation();

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

      onDebouncedFilterChange(filters);
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

  // useHotKey('/', onToggle, {
  //   isGlobal: true,
  //   shouldBind: !isAnyModalOpen,
  // });

  const prevLocation = usePrevious(location);

  useEffect(() => {
    if (!isOpen && prevLocation && prevLocation.search !== location.search) {
      filterForm.reset({
        [FORM_NAME]:
          getFeedVariablesFromQueryString(location.search)?.filters || [],
      });
    }
  }, [location.search, isOpen]);

  useEffect(() => {
    if (isOpen) {
      filterForm.reset({
        [FORM_NAME]: variables?.filters || [],
      });
    }
  }, [isOpen]);

  const trigger = (
    <Button
      cursor="pointer"
      variant="outline"
      bg="brand.purple.light"
      color="brand.purple.main"
      _hover={{ bg: '#e8e4ed', borderColor: 'brand.purple.main' }}
      size="md"
      border="none"
      isLoading={loading}
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
      closeOnEsc
      closeOnBlur={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={addButtonRef}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        {...(!isMobile
          ? {
              minWidth: fields.length ? 500 : 300,
            }
          : {
              maxHeight: '500px',
              overflowY: 'auto',
            })}
        zIndex={500}
      >
        {/* <PopoverArrow /> */}
        <PopoverBody
          {...(isMobile
            ? {
                minWidth: '100%',
              }
            : {
                minWidth: fields.length ? 500 : 300,
              })}
        >
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
                <Box key={field.id} width="100%">
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
            <Box width="100%" pb="5px" pt="5px">
              <Divider />
            </Box>
            <Stack
              isInline
              d="flex"
              width="100%"
              justifyContent={fields.length ? 'space-between' : 'flex-end'}
            >
              <AddOrUpdateSavedSearch
                filters={getFilterVariablesFromFormValues(
                  // @ts-ignore
                  !values[FORM_NAME]
                    ? Object.values(values)
                    : values[FORM_NAME],
                )}
              >
                {({ onOpen, match }: any) => (
                  <Button
                    mr="10px"
                    aria-label="add filter"
                    type="button"
                    alignSelf="flex-end"
                    variant="outline"
                    onClick={onOpen}
                    isDisabled={!fields.length}
                  >
                    {match ? 'Update or create new' : 'Save this search'}
                    <FaSave style={{ marginLeft: '5px' }} />
                  </Button>
                )}
              </AddOrUpdateSavedSearch>

              <Box>
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
                <Button
                  aria-label="add filter"
                  type="button"
                  alignSelf="flex-end"
                  ref={addButtonRef}
                  onClick={() => append({ name: randomString() })}
                >
                  Add <FaFilter style={{ marginLeft: '5px' }} />
                </Button>
              </Box>
            </Stack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
