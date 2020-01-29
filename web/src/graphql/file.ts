import gql from 'graphql-tag';

export const FILE_FULL_FRAGMENT = gql`
  fragment FileFull on File {
    id
    name
    extension

    title
    description

    originalName

    isUploaded
    fullUrl
    squareUrl

    createdAt
    updatedAt

    item {
      id
      type

      createdAt
      updatedAt

      labels {
        id
        name
      }
    }
  }
`;

export const UPDATE_FILE_MUTATION = gql`
  mutation updateFile($fileId: String!, $description: String, $title: String) {
    updateFile(fileId: $fileId, description: $description, title: $title) {
      ...FileFull
    }
  }

  ${FILE_FULL_FRAGMENT}
`;
