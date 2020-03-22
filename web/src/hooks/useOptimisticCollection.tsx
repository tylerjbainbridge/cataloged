import { useMutation, useApolloClient, gql } from '@apollo/client';
import _ from 'lodash';
import cuid from 'cuid';

import { useToast } from '@chakra-ui/core';
import {
  MOVE_ENTRY_TO_COLLECTION_POSITION,
  UPDATE_ENTRY_POSITIONS,
  COLLECTION_FULL_FRAGMENT,
  ADD_ENTRY_TO_COLLECTION,
  REMOVE_ENTRY_FROM_COLLECTION,
  UPDATE_BLOCK_CONTENT,
  COLLECTION_BLOCK_FRAGMENT,
  UPDATE_COLLECTION,
} from '../graphql/collection';
import { CollectionFull } from '../graphql/__generated__/CollectionFull';
import { CollectionEntryFull } from '../graphql/__generated__/CollectionEntryFull';
import { CollectionBlockFull } from '../graphql/__generated__/CollectionBlockFull';
import { useDebounce } from './useDebounce';

const BLOCK_WITH_CONTENT = gql`
  fragment BlockWithContent on CollectionBlock {
    id

    content
  }
`;

const COLLECTION_WITH_ENTRIES_FRAGMENT = gql`
  fragment CollectionWithEntries on Collection {
    id

    entries {
      id
      position
    }
  }
`;

export const useOptimisticCollection = (collection: CollectionFull) => {
  const toast = useToast();
  const client = useApolloClient();

  const id = `Collection:${collection.id}`;

  const [updateEntryPositions] = useMutation(UPDATE_ENTRY_POSITIONS);
  const [addEntryToCollection] = useMutation(ADD_ENTRY_TO_COLLECTION);
  const [removeEntryFromCollection] = useMutation(REMOVE_ENTRY_FROM_COLLECTION);

  const [_updateBlockContent] = useMutation(UPDATE_BLOCK_CONTENT);
  const [_updateCollection] = useMutation(UPDATE_COLLECTION);

  const debouncedUpdateBlockContent = useDebounce(_updateBlockContent);
  const updateCollection = useDebounce(_updateCollection);

  const updateCachedCollectionEntries = (entries: CollectionEntryFull[]) => {
    client.writeFragment({
      id,
      fragment: COLLECTION_FULL_FRAGMENT,
      fragmentName: 'CollectionFull',
      data: {
        id: collection.id,
        entries,
      },
    });
  };

  const updateCollectionName = async (name: string) => {
    client.writeFragment({
      id,
      fragment: COLLECTION_FULL_FRAGMENT,
      fragmentName: 'CollectionFull',
      data: {
        id: collection.id,
        name,
      },
    });

    updateCollection({
      variables: {
        collectionId: collection.id,
        name,
      },
    });
  };

  const updateBlockContent = async (
    blockId: CollectionBlockFull['id'],
    content: string,
  ) => {
    client.writeFragment({
      id: `CollectionBlock:${blockId}`,
      fragment: BLOCK_WITH_CONTENT,
      data: {
        id: blockId,
        content,
      },
    });

    debouncedUpdateBlockContent({
      variables: {
        collectionId: collection.id,
        blockId,
        content,
      },
    });
  };

  const removeEntry = async (entryId: CollectionEntryFull['id']) => {
    const { entries } = collection;

    // Update in cache
    updateCachedCollectionEntries(
      entries.filter((entry: CollectionEntryFull) => entry.id !== entryId),
    );

    // Persist on server
    await removeEntryFromCollection({
      variables: {
        // @ts-ignore
        collectionId: collection.id,
        entryId,
      },
    });
  };

  const insertAtPosition = async (entryInput: any) => {
    // const { entries } = client.readFragment({
    //   id,
    //   fragment: COLLECTION_FULL_FRAGMENT,
    //   fragmentName: 'CollectionFull',
    // });

    const { entries } = collection;

    const index = entries.findIndex(
      (entry: any) => entry.position === entryInput.position,
    );

    const block: CollectionBlockFull = {
      __typename: 'CollectionBlock',
      id: cuid(),
      type: entryInput.blockType,
      content: entryInput.blockContent,
    };

    const entry: CollectionEntryFull = {
      __typename: 'CollectionEntry',
      id: cuid(),
      position: entryInput,
      block,
      item: null,
    };

    const copy = [...entries];

    copy.splice(index, 0, entry);

    // Update in cache
    updateCachedCollectionEntries(copy);

    // Persist on server
    await addEntryToCollection({
      variables: {
        // @ts-ignore
        collectionId: collection.id,
        entryInput: {
          ...entryInput,
          blockId: block.id,
          entryId: entry.id,
        },
      },
    });
  };

  const updatePositions = async (updatedEntries: CollectionEntryFull[]) => {
    const { entries } = collection;

    updateCachedCollectionEntries(
      updatedEntries.map((entry: CollectionEntryFull, idx: number) => ({
        ...entry,
        position: idx + 1,
      })),
    );
    // const post = entries.find(({ id }) => id === entryId)?.position;

    // toast({
    //   title: 'Updated labels',
    //   status: 'success',
    //   duration: 2000,
    //   position: 'bottom-left',
    // });

    // Commit changes to DB
    await updateEntryPositions({
      variables: {
        // @ts-ignore
        collectionId: collection.id,
        entries: updatedEntries.map(({ id }: any, idx) => ({
          id,
          position: idx + 1,
        })),
      },
    });
  };

  // const insertAtPosition = async (
  //   collectionId: Collection['id'],
  //   userId: User['id'],
  //   entries: CollectionEntry,
  // ) => {};

  return {
    removeEntry,
    updatePositions,
    insertAtPosition,
    updateBlockContent,
    updateCollectionName,
  };
};
