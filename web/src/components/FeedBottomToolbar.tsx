import React, { useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Box,
  Text,
  Button,
  IconButton,
  Tooltip,
  Select,
} from '@chakra-ui/core';

import { SelectContext } from './SelectContainer';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteManyItems } from '../hooks/useOptimisticDeleteManyItems';
import { Labels } from './Labels';
import { useOptimisticBatchUpdateItemLabels } from '../hooks/useOptimisticBatchUpdateItemLabels';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { useOptimisticUpdateStatusManyItems } from '../hooks/useOptimisticUpdateStatusManyItems';

export const FeedBottomToolbar = () => {
  const { selectedItems, deselectAllItems } = useContext(SelectContext);
  const [selectedStatus, updatedSelectedStatus] = useState<string | null>(null);

  const toolbarRef = React.useRef(null);

  const isActive = !!selectedItems.length;

  useHotKey('esc', deselectAllItems, {
    shouldBind: isActive,
  });

  const [deleteItems, { loading: isDeleting }] = useOptimisticDeleteManyItems(
    selectedItems,
    {
      onCompleted: deselectAllItems,
    },
  );

  const [
    batchUpdate,
    { loading: isUpdatingLabels },
  ] = useOptimisticBatchUpdateItemLabels(selectedItems, {
    onCompleted: deselectAllItems,
  });

  const isEveryItemSelected = selectedItems.every(
    ({ isFavorited }: ItemFull) => isFavorited,
  );

  const isFavorited = !isEveryItemSelected;

  const [favoriteItems] = useOptimisticUpdateFavoriteManyItems(
    selectedItems,
    isFavorited,
    {
      onCompleted: deselectAllItems,
    },
  );

  const [updateStatus] = useOptimisticUpdateStatusManyItems(
    selectedItems,
    selectedStatus,
    {
      onCompleted: deselectAllItems,
    },
  );

  useEffect(() => {
    if (selectedStatus) {
      // @ts-ignore
      updateStatus(selectedStatus);
      updatedSelectedStatus(null);
    }
  }, [selectedStatus]);

  if (!isActive) return null;

  const commonLabels = _.intersectionBy(
    ...selectedItems.map(({ labels }: any) => labels),
    'id',
  );

  return (
    <Box
      ref={toolbarRef}
      d="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom={0}
      zIndex={2}
      width="100%"
      height="60px"
      boxShadow="0px -1px 5px -1px rgba(0,0,0,0.75);"
      backgroundColor="white"
    >
      <Box
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        width="70%"
        maxWidth="800px"
        height="30px"
      >
        <Box d="flex" width="200px" alignItems="center">
          <Tooltip
            hasArrow
            aria-label="deselect all items"
            label="press esc to cancel"
            placement="top"
          >
            <IconButton
              cursor="pointer"
              icon="small-close"
              aria-label="close"
              onClick={deselectAllItems}
            />
          </Tooltip>

          <Text ml={5} fontSize="xl" fontWeight="semibold">
            {selectedItems.length} selected
          </Text>
        </Box>
        <Box d="flex" height="100%" width="400px" alignItems="center">
          <Button
            mr={3}
            cursor="pointer"
            variantColor="red"
            onClick={() => deleteItems()}
            isDisabled={isDeleting}
            isLoading={isDeleting}
          >
            Delete
          </Button>

          <Labels
            selectedLabels={commonLabels}
            onApply={(nextLabelSet: any[]) => {
              const labelIdsToRemove = commonLabels
                .filter(
                  (c: any) =>
                    !nextLabelSet.find((label: any) => c.id === label.id),
                )
                .map(({ id }: any) => id);

              const labelIdsToAdd = nextLabelSet.map(({ id }) => id);

              if (!_.isEmpty(_.flatten([labelIdsToRemove, labelIdsToAdd]))) {
                batchUpdate({
                  variables: {
                    // @ts-ignore
                    labelIdsToRemove,
                    labelIdsToAdd,
                  },
                });
              }
            }}
            showSelectedLabels={false}
            trigger={
              <Button mr={3} cursor="pointer" isLoading={isUpdatingLabels}>
                Label
              </Button>
            }
          />

          <Button
            cursor="pointer"
            onClick={() => favoriteItems()}
            leftIcon="star"
          >
            {isFavorited ? 'Add' : 'Remove'}
          </Button>
          <Select
            ml={3}
            cursor="pointer"
            width="100px"
            placeholder="Status"
            onChange={(e: any) => {
              // @ts-ignore
              updatedSelectedStatus(e.target.value);
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
        </Box>
      </Box>
    </Box>
  );
};
