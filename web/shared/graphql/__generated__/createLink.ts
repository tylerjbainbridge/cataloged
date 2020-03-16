/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createLink
// ====================================================

export interface createLink_createLink_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
}

export interface createLink_createLink {
  __typename: "Link";
  id: string;
  href: string;
  item: createLink_createLink_item | null;
}

export interface createLink {
  createLink: createLink_createLink;
}

export interface createLinkVariables {
  href: string;
}
