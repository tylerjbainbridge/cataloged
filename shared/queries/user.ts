import gql from 'graphql-tag';

export const GET_AUTH_USER = gql`
  query getAuthUser {
    me {
      id
      fullName
      email

      isActive

      role

      googleAccounts {
        id
        email
      }

      inviteCode {
        code
      }

      labels {
        id
        name
      }

      collections {
        id
        name
        description
      }
    }
  }
`;
