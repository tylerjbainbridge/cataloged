import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { useMutation, gql, useQuery } from '@apollo/client';
import {
  Box,
  Tag,
  Text,
  Spinner,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
} from '@chakra-ui/core';
import { FaCheck } from 'react-icons/fa';

import { ModalSelect, useKeyDown } from './CommandCenter';
import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';
import { getNodesFromConnection } from '../util/helpers';
import Downshift from 'downshift';
import FilterSearchInput from './FilterSearchInput';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { GenericListItem, LIST_ITEM_HEIGHT } from './GenericListItem';

export const COMMAND_CENTER_SEARCH_ITEMS = gql`
  query CommandCenterSearchItems(
    $first: Int
    $after: String
    $filters: [FilterInput!]
  ) {
    itemsConnection(
      first: $first
      after: $after

      filters: $filters

      orderBy: { date: desc }
    ) @connection(key: "command_center_search_items") {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;

export const CommandCenterSearchItems = ({ onItemSelect }: any) => {
  const [filters, setFilters] = useState([]);

  const inputRef = useRef(null);

  const handleSelection = async (item: any) => {
    onItemSelect(item);
  };

  const query = useQuery<any>(COMMAND_CENTER_SEARCH_ITEMS, {
    variables: {
      filters,
      first: 10,
      after: null,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  const [onKeyDownHandler] = useKeyDown(items, (item: any) => {
    handleSelection(item);
  });

  return (
    <ModalContent
      as="form"
      height="300px"
      maxHeight="300px"
      width="550px"
      rounded="lg"
    >
      <ModalHeader>
        Search Items{' '}
        {loading && <Spinner ml="2px" size="sm" color="gray.200" />}
      </ModalHeader>
      <ModalCloseButton />

      <Downshift
        defaultHighlightedIndex={0}
        selectedItem=""
        onSelect={() => {}}
        // @ts-ignore
        // onChange={selection => updatePrimaryAction(selection)}
        // inputValue={values.search}
      >
        {({
          getItemProps,
          getMenuProps,
          highlightedIndex,
          selectedItem,
          getRootProps,
          setHighlightedIndex,
        }) => {
          return (
            <ModalBody
              p="0px"
              height="300px"
              onKeyDown={onKeyDownHandler({
                selectedItem,
                highlightedIndex,
                setHighlightedIndex,
                clearOnSelect: false,
              })}
            >
              <Box
                // @ts-ignore
                {...getRootProps({}, { suppressRefError: true })}
              >
                <Box
                  ref={(ref: any) => {
                    inputRef.current = ref;
                  }}
                  pl="10px"
                  pr="10px"
                  pb="10px"
                >
                  <FilterSearchInput
                    shouldFocusOnMount
                    onChange={(filters: any) => {
                      refetch({ filters });
                    }}
                  />
                </Box>
              </Box>
              <Box
                // spacing="10px"
                {...getMenuProps()}
                // @ts-ignore
                width={inputRef?.current?.offsetWidth || '100%'}
                // zIndex={100}
                maxHeight="100%"
                backgroundColor="white"
                rounded="lg"
                overflowY="scroll"
              >
                {items.map((item: any, index: number) => {
                  return (
                    <Flex
                      alignItems="center"
                      width="100%"
                      cursor="pointer"
                      d="flex"
                      height="70px"
                      {...getItemProps({
                        key: item.name + item.id + index,
                        index,
                        // @ts-ignore
                        item,
                        onClick: () => handleSelection(item),
                        // @ts-ignore
                        backgroundColor:
                          highlightedIndex === index
                            ? 'rgba(87,24,255, 0.1)'
                            : 'none',
                      })}
                    >
                      <GenericListItem
                        item={item}
                        isSearchItem
                        withMarginBottom={false}
                        // isCursorItem={highlightedIndex === index}
                      />
                    </Flex>
                  );
                })}
              </Box>
            </ModalBody>
          );
        }}
      </Downshift>
    </ModalContent>
  );
};
