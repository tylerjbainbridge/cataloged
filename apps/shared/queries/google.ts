import gql from 'graphql-tag';

export const GOOGLE_AUTH_MUTATION = gql`
  mutation googleAuth($code: String!) {
    googleAuth(code: $code) {
      token
    }
  }
`;
