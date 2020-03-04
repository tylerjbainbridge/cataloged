import React from 'react';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { Box, Tag, Text, Spinner } from '@chakra-ui/core';
import { FaCheck } from 'react-icons/fa';

import { ModalSelect, useRelevantItems } from './CommandCenter';
import { CREATE_LABEL_MUTATION } from './Labels';
import { useOptimisticBatchUpdateItemLabels } from '../hooks/useOptimisticBatchUpdateItemLabels';

export const CommandCenterSelectLabels = ({ user }: any) => {
  const relevantItems = useRelevantItems();

  const commonLabels = _.intersectionBy(
    ...relevantItems.map(({ labels }: any) => labels),
    'id',
  );

  const isLabelSelected = (item: any) =>
    !!commonLabels.find(({ id }: any) => id === item.id);

  const [createLabel, { loading: isCreatingNewLabel }] = useMutation(
    CREATE_LABEL_MUTATION,
  );

  const [batchUpdateLabels] = useOptimisticBatchUpdateItemLabels(relevantItems);

  const handleSelection = async (item: any, { setValue, search }: any) => {
    if (item.isPlaceholder) {
      const { data } = await createLabel({
        variables: { name: search },
      });

      const label = data.createLabel.labels.find(
        (l: any) => l.name === item.name,
      );

      batchUpdateLabels({
        labelIdsToAdd: [label.id],
      });
    } else {
      batchUpdateLabels(
        isLabelSelected(item)
          ? {
              // @ts-ignore
              labelIdsToRemove: [item.id],
              // @ts-ignore
            }
          : {
              labelIdsToAdd: [item.id],
            },
      );
    }

    setValue('search', '');
  };

  return (
    <ModalSelect
      placeholder="Type to filter collections"
      handleSelection={handleSelection}
      header={
        <>
          Select labels{commonLabels.length ? ` (${commonLabels.length})` : ''}
          {isCreatingNewLabel && <Spinner ml="3px" size="sm" />}
        </>
      }
      getOptions={(search: string) => {
        let options = user.labels.filter(
          (label: any) =>
            !search ||
            //@ts-ignore
            label.name.toLowerCase().includes(search.toLowerCase()),
        );

        if (search && !user.labels.find(({ name }: any) => name === search)) {
          return [{ name: search, id: 123, isPlaceholder: true }, ...options];
        }

        return options;
      }}
      getItemNode={(item: any) => (
        <>
          <Box>
            {item.isPlaceholder && 'Create label '}
            <Tag size="lg">{item.name}</Tag>
          </Box>

          {isLabelSelected(item) && (
            <Box pr="20px">
              <FaCheck />
            </Box>
          )}
        </>
      )}
    />
  );
};
