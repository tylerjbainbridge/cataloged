/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoteFull
// ====================================================

export interface NoteFull_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface NoteFull_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: NoteFull_item_labels[];
}

export interface NoteFull {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  item: NoteFull_item | null;
}
