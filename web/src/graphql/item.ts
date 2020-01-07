import gql from 'graphql-tag';
import { NOTE_FULL_FRAGMENT } from './note';
import { LINK_FULL_FRAGMENT } from './link';

export const ITEM_FULL_FRAGMENT = gql`
  fragment ItemFull on Item {
    id
    type

    createdAt
    updatedAt

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
      # user
      id
    }
  }
`;
