import React, { useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Box,
  Text,
  Button,
  IconButton,
  Tooltip,
  Select,
  Stack,
  Tag,
} from '@chakra-ui/core';
import { useMedia } from 'react-use';

import { SelectContext } from './SelectContainer';
import { useHotKey } from 'cataloged-shared/hooks/useHotKey';
import { useOptimisticDeleteManyItems } from 'cataloged-shared/hooks/useOptimisticDeleteManyItems';
import { Labels } from './Labels';
import { useOptimisticBatchUpdateItemLabels } from 'cataloged-shared/hooks/useOptimisticBatchUpdateItemLabels';
import { useOptimisticUpdateFavoriteManyItems } from 'cataloged-shared/hooks/useOptimisticUpdateFavoriteManyItems';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { useOptimisticUpdateStatusManyItems } from 'cataloged-shared/hooks/useOptimisticUpdateStatusManyItems';
import { getKeybindAsArray } from 'cataloged-shared/util/helpers';
import { FeedContext } from './Feed';

export const FeedBottomToolbar = ({ width }: any) => {
  const isMobile = useMedia('(max-width: 768px)');

  const { selectedItems, deselectAllItems } = useContext(SelectContext);
  const { setCursorItemId } = useContext(FeedContext);

  const [selectedStatus, updatedSelectedStatus] = useState<string | null>(null);

  const toolbarRef = React.useRef(null);

  const isActive = !!selectedItems.length;

  useHotKey('esc', () => {
    deselectAllItems();
    setCursorItemId(null);
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
      width={width}
      height={isMobile ? '120px' : '60px'}
      boxShadow="0px -5px 5px -5px rgba(0,0,0,0.75);"
      backgroundColor="white"
    >
      <Box
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        width={isMobile ? '100%' : '70%'}
        maxWidth="800px"
        height="100%"
        padding={isMobile ? '10px' : undefined}
        flexWrap="wrap"
      >
        <Box d="flex" alignItems="center" height="100%">
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
          <Stack
            d="flex"
            alignItems="center"
            pl="20px"
            spacing={2}
            isInline
            fontSize="xl"
          >
            <Text>Hint: press</Text>
            {getKeybindAsArray('mod k').map((key, idx) =>
              key === 'then' ? (
                <Text key={idx + key}>then</Text>
              ) : (
                <Tag
                  size="sm"
                  key={idx + key}
                  variantColor="gray"
                  textAlign="center"
                >
                  {key}
                </Tag>
              ),
            )}
            <Text>to open the command center</Text>
          </Stack>
        </Box>
        {/* <Box
          d="flex"
          height={!isMobile ? '100%' : undefined}
          width="400px"
          flexWrap="wrap"
          alignItems="center"
        > */}
        {/* <Button
            mr={isMobile ? 1 : 3}
            p={isMobile ? 1 : undefined}
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
                  // @ts-ignore
                  labelIdsToRemove,
                  labelIdsToAdd,
                });
              }
            }}
            showSelectedLabels={false}
            trigger={
              <Button
                mr={isMobile ? 1 : 3}
                p={isMobile ? 1 : undefined}
                cursor="pointer"
                isLoading={isUpdatingLabels}
              >
                Label
              </Button>
            }
          />

          <Button
            mr={isMobile ? 1 : 3}
            p={isMobile ? '10px' : undefined}
            cursor="pointer"
            onClick={() => favoriteItems()}
            leftIcon="star"
          >
            {isFavorited ? 'Add' : 'Remove'}
          </Button>
          <Select
            cursor="pointer"
            maxWidth="100px"
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
          </Select> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};
