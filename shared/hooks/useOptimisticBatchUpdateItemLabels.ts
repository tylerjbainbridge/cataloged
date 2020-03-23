import { useMutation, useApolloClient, gql } from '@apollo/client';

import {
  BATCH_UPDATE_ITEMS_LABELS_MUTATION,
  ITEM_FULL_FRAGMENT,
} from 'cataloged-shared/graphql/item';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { LABEL_FULL_FRAGMENT } from 'cataloged-shared/graphql/label';

const ITEM_WITH_LABELS_FRAGMENT = gql`
  fragment ItemWithLabels on Item {
    id
    labels {
      id
      name
    }
  }
`;

const LABEL_FRAGMENT = gql`
  fragment BasicLabel on Label {
    id
    name
  }
`;

export const useOptimisticBatchUpdateItemLabels = (
  items: ItemFull[],
  options = {},
) => {
  const toast = useToast();
  const client = useApolloClient();

  const itemIds = items.map(({ id }) => id);

  const [mutate, ...rest] = useMutation(BATCH_UPDATE_ITEMS_LABELS_MUTATION, {
    variables: { itemIds },
    ...options,
    // refetchQueries: ['feed'],
    onCompleted: (...args) => {
      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
  });

  return [
    async ({ labelIdsToRemove = [], labelIdsToAdd = [] }) => {
      const labelsToAddMap = labelIdsToAdd.reduce(
        (p, id) => ({
          ...p,
          [id]: client.readFragment({
            id: `Label:${id}`,
            fragment: LABEL_FRAGMENT,
          }),
        }),
        {},
      );

      itemIds.forEach(itemId => {
        const id = `Item:${itemId}`;
        const item = client.readFragment({
          id,
          fragment: ITEM_WITH_LABELS_FRAGMENT,
        });

        if (item) {
          client.writeFragment({
            id,
            fragment: ITEM_WITH_LABELS_FRAGMENT,
            data: {
              id: item.id,
              labels: [
                // @ts-ignore
                ...item.labels.filter(
                  ({ id }: any) =>
                    // @ts-ignore
                    !labelIdsToRemove.includes(id),
                ),
                ...Object.values(labelsToAddMap).filter(
                  // @ts-ignore
                  label => !item.labels.find(({ id }) => id === label.id),
                ),
              ],
            },
          });
        }
      });

      toast({
        title: 'Updated labels',
        status: 'success',
        duration: 2000,
        position: 'bottom-left',
      });

      await mutate({
        variables: {
          // @ts-ignore
          labelIdsToAdd,
          labelIdsToRemove,
          itemIds,
        },
      });
    },
    ...(rest as any),
  ];
};
