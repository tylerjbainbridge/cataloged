import React from 'react';
import {
  Box,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Flex,
  Tooltip,
} from '@chakra-ui/core';
import { format } from 'date-fns';
import _ from 'lodash';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { getGenericItemData } from '../util/itemHelpers';
import { GenericListItem } from './GenericListItem';
import { useOptimisticItemToItem } from '../hooks/useOptimisticItemToItem';
import { FaTrash, FaUnlink } from 'react-icons/fa';
import { useGoToItem } from '../hooks/useGoTo';
import { Link, useLocation } from 'react-router-dom';
import { getQueryStringFromFilters } from '../util/helpers';

export interface ItemDrawerMeta {
  item: ItemFull;
  children?: any;
}

export const ItemDrawerMeta = ({ item, children = null }: ItemDrawerMeta) => {
  const { disconnectItemFromItem } = useOptimisticItemToItem();

  const [goToItem] = useGoToItem();
  const location = useLocation();
  const { title } = getGenericItemData(item);

  return (
    <Stack spacing="20px">
      {children}
      {!!item.items?.length && (
        <Stat>
          {/* <Link
            to={{
              search: getQueryStringFromFilters(
                [
                  {
                    name: 'relatedToItem',
                    value: item.id,
                    display: `related to: ${_.truncate(title, {
                      length: 20,
                    })}`,
                  },
                ],
                location.search,
              ),
            }}
          >
            
          </Link> */}
          <StatLabel>Related items ({item.items.length})</StatLabel>
          <Box overflowY="auto" maxHeight="100%">
            {item.items.map(relatedItem => (
              <Flex justifyContent="space-between" alignItems="center">
                <Box
                  onClick={() => {
                    // @ts-ignore
                    goToItem(relatedItem);
                  }}
                >
                  <GenericListItem
                    // @ts-ignore
                    item={relatedItem}
                    isSearchItem
                    onlyImportant
                    withMarginBottom={false}
                  />
                </Box>

                <Tooltip
                  hasArrow
                  placement="left"
                  aria-label="Disconnect from item"
                  label="Disconnect from item"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      // @ts-ignore
                      disconnectItemFromItem(item, relatedItem);
                    }}
                  >
                    <FaUnlink size="15" />
                  </Button>
                </Tooltip>
              </Flex>
            ))}
          </Box>
        </Stat>
      )}
      <Stat>
        <StatLabel>
          {item.type === 'googleContact' ? 'Updated' : 'Created'}
        </StatLabel>
        <StatNumber>{format(new Date(item.date), 'MMM dd, yyyy')}</StatNumber>
      </Stat>
      {/* <Stat>
        <StatLabel>Updated</StatLabel>
        <StatNumber>
          {format(new Date(item.updatedAt), "MMM dd, yyyy 'at' h:mm:ss aaaa")}
        </StatNumber>
      </Stat> */}
    </Stack>
  );
};
