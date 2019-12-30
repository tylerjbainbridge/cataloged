import gql from 'graphql-tag';

export const NOTE_FULL_FRAGMENT = gql`
  fragment NoteFull on Note {
    id

    raw
    text

    createdAt
    updatedAt

    item {
      id
      type

      labels {
        id
        name
      }
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation createNote($raw: String!, $text: String!) {
    createNote(raw: $raw, text: $text) {
      ...NoteFull
    }
  }

  ${NOTE_FULL_FRAGMENT}
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation updateNote($noteId: String!, $raw: String!, $text: String!) {
    updateNote(noteId: $noteId, raw: $raw, text: $text) {
      ...NoteFull
    }
  }

  ${NOTE_FULL_FRAGMENT}
`;
