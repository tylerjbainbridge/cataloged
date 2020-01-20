import gql from 'graphql-tag';
import { NOTE_FULL_FRAGMENT } from './note';
import { LINK_FULL_FRAGMENT } from './link';

export const ITEM_FULL_FRAGMENT = gql`
  fragment ItemFull on Item {
    id
    type

    createdAt
    updatedAt

    isFavorited
    status

    labels {
      id
      name
    }

    link {
      ...LinkFull
    }

    file {
      id
      name
      extension
      isUploaded
      fullUrl
      squareUrl

      createdAt
      updatedAt
    }

    note {
      ...NoteFull
    }
  }

  ${LINK_FULL_FRAGMENT}
  ${NOTE_FULL_FRAGMENT}
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

      labels {
        id
        name
      }
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
