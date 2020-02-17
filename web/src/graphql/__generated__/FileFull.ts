/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FileFull
// ====================================================

export interface FileFull_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface FileFull_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: FileFull_item_labels[];
}

export interface FileFull {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  title: string;
  description: string;
  originalName: string;
  isUploaded: boolean | null;
  fullUrl: string;
  squareUrl: string;
  createdAt: any;
  updatedAt: any;
  item: FileFull_item;
}
