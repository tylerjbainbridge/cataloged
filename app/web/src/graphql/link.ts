import gql from 'graphql-tag';

export const LINK_FULL_FRAGMENT = gql`
  fragment LinkFull on Link {
    id

    href
    notes

    createdAt
    updatedAt

    image
    favicon
    logo
    title
    description

    host
    isIframeDisabled
  }
`;

export const UPDATE_LINK_MUTATION = gql`
  mutation updateLink(
    $linkId: String!
    $href: String!
    $title: String!
    $description: String
  ) {
    updateLink(
      linkId: $linkId
      href: $href
      title: $title
      description: $description
    ) {
      ...LinkFull
    }
  }

  ${LINK_FULL_FRAGMENT}
`;

export const REFRESH_LINK_META_MUTATION = gql`
  mutation refreshLinkMeta($linkId: String!, $href: String!) {
    refreshLinkMeta(linkId: $linkId, href: $href) {
      ...LinkFull
    }
  }

  ${LINK_FULL_FRAGMENT}
`;
