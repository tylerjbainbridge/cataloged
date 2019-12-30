import gql from 'graphql-tag';
import { NOTE_FULL_FRAGMENT } from './note';

export const ITEM_FULL_FRAGMENT = gql`
  fragment ItemFull on Item {
    id
    type

    labels {
      id
      name
    }

    link {
      id
      href
      notes

      image
      favicon
      title
      description
    }

    file {
      id
      name
      extension
      isUploaded
      fullUrl
      squareUrl
    }

    note {
      ...NoteFull
    }
  }

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
