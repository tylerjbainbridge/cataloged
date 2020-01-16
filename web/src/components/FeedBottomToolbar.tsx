import React, { useContext } from 'react';
import _ from 'lodash';
import {
  Box,
  Text,
  Button,
  IconButton,
  Tooltip,
  ButtonGroup,
} from '@chakra-ui/core';

import { SelectContext } from './SelectContainer';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteManyItems } from '../hooks/useOptimisticDeleteManyItems';
import { Labels } from './Labels';
import { useOptimisticBatchUpdateItemLabels } from '../hooks/useOptimisticBatchUpdateItemLabels';

export const FeedBottomToolbar = () => {
  const { selectedItems, deselectAllItems } = useContext(SelectContext);

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
        maxWidth="500px"
        height="30px"
      >
        <Box
          d="flex"
          width="130px"
          alignItems="center"
          justifyContent="space-between"
        >
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

          <Text fontSize="xl" fontWeight="semibold">
            {selectedItems.length} selected
          </Text>
        </Box>
        <ButtonGroup d="flex" width="200px" spacing={3}>
          <Button
            ml={3}
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
              <Button ml={3} cursor="pointer" isLoading={isUpdatingLabels}>
                Label
              </Button>
            }
          />
        </ButtonGroup>
      </Box>
    </Box>
  );
};
