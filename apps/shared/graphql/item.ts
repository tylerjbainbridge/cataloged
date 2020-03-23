import gql from 'graphql-tag';
import { NOTE_FULL_FRAGMENT } from './note';
import { LINK_FULL_FRAGMENT } from './link';
import { FILE_FULL_FRAGMENT } from './file';
import { GOOGLE_CONTACT_FULL_FRAGMENT } from './googleContact';
import { LABEL_FULL_FRAGMENT } from './label';

export const ITEM_TO_ITEM_FRAGMENT = gql`
  fragment ItemToItem on Item {
    id
    type

    date
    createdAt
    updatedAt

    isFavorited
    status

    labels {
      ...LabelFull
    }

    collections {
      id
      name
      description
    }

    link {
      ...LinkFull
    }

    file {
      ...FileFull
    }

    note {
      ...NoteFull
    }

    googleContact {
      ...GoogleContactFull
    }
  }

  ${LABEL_FULL_FRAGMENT}
  ${LINK_FULL_FRAGMENT}
  ${NOTE_FULL_FRAGMENT}
  ${FILE_FULL_FRAGMENT}
  ${GOOGLE_CONTACT_FULL_FRAGMENT}
`;

export const ITEM_FULL_FRAGMENT = gql`
  fragment ItemFull on Item {
    id
    type

    date
    createdAt
    updatedAt

    isFavorited
    status

    labels {
      ...LabelFull
    }

    collections {
      id
      name
      description
    }

    link {
      ...LinkFull
    }

    file {
      ...FileFull
    }

    note {
      ...NoteFull
    }

    items {
      ...ItemToItem
    }

    googleContact {
      ...GoogleContactFull
    }
  }

  ${LABEL_FULL_FRAGMENT}
  ${LINK_FULL_FRAGMENT}
  ${NOTE_FULL_FRAGMENT}
  ${FILE_FULL_FRAGMENT}
  ${GOOGLE_CONTACT_FULL_FRAGMENT}
  ${ITEM_TO_ITEM_FRAGMENT}
`;

export const ITEM_CONNECTION_FULL_FRAGMENT = gql`
  fragment ItemConnectionFull on ItemConnection {
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }

    edges {
      cursor

      node {
        ...ItemFull
      }
    }
  }

  ${ITEM_FULL_FRAGMENT}
`;

export const ITEM_WITH_LABELS_FRAGMENT = gql`
  fragment ItemWithLabels on Item {
    id
    type

    labels {
      id
      name
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($itemId: String!) {
    deleteItem(itemId: $itemId) {
      id
    }
  }
`;

export const DELETE_MANY_ITEMS_MUTATION = gql`
  mutation deleteManyItems($itemIds: [String!]!) {
    deleteManyItems(itemIds: $itemIds) {
      id
    }
  }
`;

export const CONNECT_ITEM_TO_ITEM_MUTATION = gql`
  mutation connectItemToItem($itemOneId: String!, $itemTwoId: String!) {
    connectItemToItem(itemOneId: $itemOneId, itemTwoId: $itemTwoId) {
      id

      items {
        ...ItemToItem
      }
    }
  }

  ${ITEM_TO_ITEM_FRAGMENT}
`;

export const DICONNECT_ITEM_FROM_ITEM_MUTATION = gql`
  mutation disconnectItemFromItem($itemOneId: String!, $itemTwoId: String!) {
    disconnectItemFromItem(itemOneId: $itemOneId, itemTwoId: $itemTwoId) {
      id

      items {
        ...ItemToItem
      }
    }
  }

  ${ITEM_TO_ITEM_FRAGMENT}
`;

export const BATCH_UPDATE_ITEMS_LABELS_MUTATION = gql`
  mutation batchUpdateItemLabels(
    $itemIds: [String!]!
    $labelIdsToAdd: [String!]!
    $labelIdsToRemove: [String!]!
  ) {
    batchUpdateItemLabels(
      itemIds: $itemIds
      labelIdsToAdd: $labelIdsToAdd
      labelIdsToRemove: $labelIdsToRemove
    ) {
      id

      # labels {
      #   id
      #   name
      # }
    }
  }
`;

export const BATCH_UPDATE_ITEMS_COLLECTIONS_MUTATION = gql`
  mutation batchUpdateItemCollections(
    $itemIds: [String!]!
    $collectionIdsToAdd: [String!]!
    $collectionIdsToRemove: [String!]!
  ) {
    batchUpdateItemCollections(
      itemIds: $itemIds
      collectionIdsToAdd: $collectionIdsToAdd
      collectionIdsToRemove: $collectionIdsToRemove
    ) {
      id

      # collections {
      #   id
      #   name
      #   description
      # }
    }
  }
`;

export const UPDATE_FAVORITE_MANY_ITEMS_MUTATION = gql`
  mutation updateFavoriteManyItems(
    $itemIds: [String!]!
    $isFavorited: Boolean!
  ) {
    updateFavoriteManyItems(itemIds: $itemIds, isFavorited: $isFavorited) {
      id

      isFavorited
    }
  }
`;

export const UPDATE_STATUS_MANY_ITEMS_MUTATION = gql`
  mutation updateStatusManyItems($itemIds: [String!]!, $status: ItemStatus!) {
    updateStatusManyItems(itemIds: $itemIds, status: $status) {
      id
      status
    }
  }
`;

export const GET_ITEM = gql`
  query getItem($id: String!) {
    item(id: $id) {
      ...ItemFull
    }
  }

  ${ITEM_FULL_FRAGMENT}
`;
