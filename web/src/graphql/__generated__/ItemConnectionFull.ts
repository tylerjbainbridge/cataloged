/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL fragment: ItemConnectionFull
// ====================================================

export interface ItemConnectionFull_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ItemConnectionFull_edges_node_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemConnectionFull_edges_node_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemConnectionFull_edges_node_link_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: ItemConnectionFull_edges_node_link_item_labels[];
}

export interface ItemConnectionFull_edges_node_link {
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
  item: ItemConnectionFull_edges_node_link_item | null;
}

export interface ItemConnectionFull_edges_node_file {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean | null;
  fullUrl: string;
  squareUrl: string;
  createdAt: any;
  updatedAt: any;
}

export interface ItemConnectionFull_edges_node_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemConnectionFull_edges_node_note_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: ItemConnectionFull_edges_node_note_item_labels[];
}

export interface ItemConnectionFull_edges_node_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  item: ItemConnectionFull_edges_node_note_item | null;
}

export interface ItemConnectionFull_edges_node {
  __typename: "Item";
  id: string;
  type: string;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: ItemConnectionFull_edges_node_labels[];
  link: ItemConnectionFull_edges_node_link | null;
  file: ItemConnectionFull_edges_node_file | null;
  note: ItemConnectionFull_edges_node_note | null;
}

export interface ItemConnectionFull_edges {
  __typename: "ItemEdge";
  cursor: string;
  node: ItemConnectionFull_edges_node;
}

export interface ItemConnectionFull {
  __typename: "ItemConnection";
  pageInfo: ItemConnectionFull_pageInfo;
  edges: ItemConnectionFull_edges[];
}
