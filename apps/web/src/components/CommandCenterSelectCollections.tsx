import React from 'react';
import _ from 'lodash';
import { useMutation } from '@apollo/client';

import { ModalSelect, useRelevantItems } from './CommandCenter';
import { ADD_COLLECTION } from 'cataloged-shared/graphql/collection';
import cuid from 'cuid';
import { Box, Tag, Text, Spinner } from '@chakra-ui/core';
import { FaCheck } from 'react-icons/fa';
import { useOptimisticBatchUpdateItemCollections } from 'cataloged-shared/hooks/useOptimisticBatchUpdateItemCollections';

export const CommandCenterSelectCollections = ({ user }: any) => {
  const relevantItems = useRelevantItems();

  const commonCollections = _.intersectionBy(
    ...relevantItems.map(({ collections }: any) => collections),
    'id',
  );

  const isCollectionSelected = (item: any) =>
    !!commonCollections.find(({ id }: any) => id === item.id);

  const [addCollection, { loading: isCreatingCollecting }] = useMutation(
    ADD_COLLECTION,
    {
      refetchQueries: ['getAuthUser'],
    },
  );

  const [batchUpdateCollections] = useOptimisticBatchUpdateItemCollections(
    relevantItems,
  );

  const handleSelection = async (item: any, { setValue, search }: any) => {
    if (item.isPlaceholder) {
      const {
        data: { collection },
      } = await addCollection({
        variables: { name: search, collectionId: cuid() },
      });

      batchUpdateCollections({
        collectionIdsToAdd: [collection.id],
      });
    } else {
      batchUpdateCollections(
        isCollectionSelected(item)
          ? {
              // @ts-ignore
              collectionIdsToRemove: [item.id],
              // @ts-ignore
            }
          : {
              collectionIdsToAdd: [item.id],
            },
      );
    }

    setValue('search', '');
  };

  return (
    <ModalSelect
      placeholder={
        !user.collections.length
          ? 'Type the name of your new collection'
          : 'Type to filter collections'
      }
      handleSelection={handleSelection}
      header={
        <>
          Select collections
          {commonCollections.length ? ` (${commonCollections.length})` : ''}
          {isCreatingCollecting && <Spinner ml="3px" size="sm" />}
        </>
      }
      getOptions={(search: string) => {
        let options = user.collections.filter(
          (collection: any) =>
            !search ||
            //@ts-ignore
            collection.name.toLowerCase().includes(search.toLowerCase()),
        );

        if (
          search &&
          !user.collections.find(({ name }: any) => name === search)
        ) {
          return [{ name: search, id: 123, isPlaceholder: true }, ...options];
        }

        return options;
      }}
      getItemNode={(item: any) => (
        <>
          <Box>
            {item.isPlaceholder && 'Create collection '}
            <Text fontWeight="semibold">
              {item.isPlaceholder ? `"${item.name}"` : item.name}
            </Text>
          </Box>

          {isCollectionSelected(item) && (
            <Box pr="20px">
              <FaCheck />
            </Box>
          )}
        </>
      )}
    />
  );
};
