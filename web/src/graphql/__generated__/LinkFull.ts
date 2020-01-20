/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LinkFull
// ====================================================

export interface LinkFull_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface LinkFull_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: LinkFull_item_labels[];
}

export interface LinkFull {
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
  item: LinkFull_item | null;
}
