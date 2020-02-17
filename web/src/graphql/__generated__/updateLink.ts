/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLink
// ====================================================

export interface updateLink_updateLink_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface updateLink_updateLink_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: updateLink_updateLink_item_labels[];
}

export interface updateLink_updateLink {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
  image: string | null;
  favicon: string | null;
  title: string | null;
  description: string | null;
  item: updateLink_updateLink_item | null;
}

export interface updateLink {
  updateLink: updateLink_updateLink;
}

export interface updateLinkVariables {
  linkId: string;
  href: string;
  title: string;
  description?: string | null;
}
