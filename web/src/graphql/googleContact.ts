import gql from 'graphql-tag';

export const GOOGLE_CONTACT_FULL_FRAGMENT = gql`
  fragment GoogleContactFull on GoogleContact {
    id
    resourceName

    photoUrl
    name

    email
    otherEmails

    phoneNumber
    otherPhoneNumbers

    companyTitle
    companyName
  }
`;
