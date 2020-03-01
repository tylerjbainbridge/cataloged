import gql from 'graphql-tag';

export const LABEL_FULL_FRAGMENT = gql`
  fragment LabelFull on Label {
    id
    name
  }
`;
