/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: refreshLinkMeta
// ====================================================

export interface refreshLinkMeta_refreshLinkMeta_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface refreshLinkMeta_refreshLinkMeta_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: refreshLinkMeta_refreshLinkMeta_item_labels[];
}

export interface refreshLinkMeta_refreshLinkMeta {
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
  item: refreshLinkMeta_refreshLinkMeta_item | null;
}

export interface refreshLinkMeta {
  refreshLinkMeta: refreshLinkMeta_refreshLinkMeta;
}

export interface refreshLinkMetaVariables {
  linkId: string;
  href: string;
}
