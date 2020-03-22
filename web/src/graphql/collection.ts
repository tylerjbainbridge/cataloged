import gql from 'graphql-tag';
import { ITEM_FULL_FRAGMENT } from './item';

export const COLLECTION_BLOCK_FRAGMENT = gql`
  fragment CollectionBlockFull on CollectionBlock {
    id
    type
    content
  }
`;

export const COLLECTION_ENTRY_FULL_FRAGMENT = gql`
  fragment CollectionEntryFull on CollectionEntry {
    id

    position

    block {
      ...CollectionBlockFull
    }

    item {
      ...ItemFull
    }
  }

  ${ITEM_FULL_FRAGMENT}
  ${COLLECTION_BLOCK_FRAGMENT}
`;

export const COLLECTION_FULL_FRAGMENT = gql`
  fragment CollectionFull on Collection {
    id

    name

    entries(orderBy: { position: asc }) {
      ...CollectionEntryFull
    }
  }

  ${COLLECTION_ENTRY_FULL_FRAGMENT}
`;

export const MOVE_ENTRY_TO_COLLECTION_POSITION = gql`
  mutation moveEntryToCollectionPosition(
    $collectionId: String!
    $entryId: String
    $position: Int!
  ) {
    moveEntryToCollectionPosition(
      collectionId: $collectionId
      entryId: $entryId
      position: $position
    ) {
      ...CollectionFull
    }
  }

  ${COLLECTION_FULL_FRAGMENT}
`;

export const UPDATE_ENTRY_POSITIONS = gql`
  mutation updateEntryPositions(
    $collectionId: String!
    $entries: [CollectionEntryPositionInput!]
  ) {
    updateEntryPositions(collectionId: $collectionId, entries: $entries) {
      id
    }
  }
`;

export const ADD_ENTRY_TO_COLLECTION = gql`
  mutation addEntryToCollection(
    $collectionId: String!
    $entryInput: NewCollectionEntryInput!
  ) {
    addEntryToCollection(collectionId: $collectionId, entryInput: $entryInput) {
      id
    }
  }
`;

export const REMOVE_ENTRY_FROM_COLLECTION = gql`
  mutation removeEntryFromCollection(
    $collectionId: String!
    $entryId: String!
  ) {
    removeEntryFromCollection(collectionId: $collectionId, entryId: $entryId) {
      id
    }
  }
`;

export const UPDATE_BLOCK_CONTENT = gql`
  mutation updateBlockContent(
    $collectionId: String!
    $blockId: String!
    $content: String
  ) {
    updateBlockContent(
      collectionId: $collectionId
      blockId: $blockId
      content: $content
    ) {
      id
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection(
    $collectionId: String!
    $name: String!
    $description: String
  ) {
    collection: addCollection(
      collectionId: $collectionId
      name: $name
      description: $description
    ) {
      id
      name
      description
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation updateCollection(
    $collectionId: String!
    $name: String!
    $description: String
  ) {
    updateCollection(
      collectionId: $collectionId
      name: $name
      description: $description
    ) {
      id
      name
      description
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($collectionId: String!) {
    deleteCollection(collectionId: $collectionId) {
      id
    }
  }
`;
