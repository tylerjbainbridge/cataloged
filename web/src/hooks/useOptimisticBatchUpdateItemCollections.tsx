import { useMutation, useApolloClient, gql } from '@apollo/client';

import { BATCH_UPDATE_ITEMS_COLLECTIONS_MUTATION } from '../graphql/item';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { CollectionEntryFull } from '../graphql/__generated__/CollectionEntryFull';
import { COLLECTION_FULL_FRAGMENT } from '../graphql/collection';

const ITEM_WITH_COLLECTIONS_FRAGMENT = gql`
  fragment ItemWithCollections on Item {
    id
    collections {
      id
      name
    }
  }
`;

const COLLECTION_FRAGMENT = gql`
  fragment BasicCollection on Collection {
    id
    name
    description
  }
`;

export const useOptimisticBatchUpdateItemCollections = (
  items: ItemFull[],
  options = {},
) => {
  const toast = useToast();
  const client = useApolloClient();

  const itemIds = items.map(({ id }) => id);

  const [mutate, ...rest] = useMutation(
    BATCH_UPDATE_ITEMS_COLLECTIONS_MUTATION,
    {
      variables: { itemIds },
      ...options,
      // refetchQueries: ['feed'],
      onCompleted: (...args) => {
        // @ts-ignore
        if (options.onCompleted) return options.onCompleted(...args);
      },
    },
  );

  return [
    async ({ collectionIdsToRemove = [], collectionIdsToAdd = [] }) => {
      const collectionsToAddMap = collectionIdsToAdd.reduce((p, id) => {
        try {
          return {
            ...p,
            [id]: client.readFragment({
              id: `Collection:${id}`,
              fragment: COLLECTION_FULL_FRAGMENT,
              fragmentName: 'CollectionFull',
            }),
          };
        } catch (e) {
          return p;
        }
      }, {});

      collectionIdsToRemove.forEach(collectionId => {
        try {
          // @ts-ignore
          const { entries } = client.readFragment({
            id: `Collection:${collectionId}`,
            fragment: COLLECTION_FULL_FRAGMENT,
            fragmentName: 'CollectionFull',
          });

          client.writeFragment({
            id: `Collection:${collectionId}`,
            fragment: COLLECTION_FULL_FRAGMENT,
            fragmentName: 'CollectionFull',
            data: {
              id: collectionId,
              // @ts-ignore
              entries: entries.filter(
                (entry: CollectionEntryFull) =>
                  // @ts-ignore
                  !itemIds.includes(entry?.item?.id),
              ),
            },
          });
        } catch (e) {}
      });

      itemIds.forEach(itemId => {
        const id = `Item:${itemId}`;
        const item = client.readFragment({
          id,
          fragment: ITEM_WITH_COLLECTIONS_FRAGMENT,
        });

        if (item) {
          client.writeFragment({
            id,
            fragment: ITEM_WITH_COLLECTIONS_FRAGMENT,
            data: {
              id: item.id,
              collections: [
                // @ts-ignore
                ...item.collections.filter(
                  ({ id }: any) =>
                    // @ts-ignore
                    !collectionIdsToRemove.includes(id),
                ),
                ...Object.values(collectionsToAddMap).filter(
                  // @ts-ignore
                  (collection: any) =>
                    !item.collections.find(
                      ({ id }: any) => id === collection.id,
                    ),
                ),
              ],
            },
          });
        }
      });

      toast({
        title: 'Updated collections',
        status: 'success',
        duration: 2000,
        position: 'bottom-left',
      });

      await mutate({
        variables: {
          // @ts-ignore
          collectionIdsToAdd,
          collectionIdsToRemove,
          itemIds,
        },
      });
    },
    ...(rest as any),
  ];
};
