/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Filter, ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL query operation: feed
// ====================================================

export interface feed_itemsConnection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface feed_itemsConnection_edges_node_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_link_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: feed_itemsConnection_edges_node_link_item_labels[];
}

export interface feed_itemsConnection_edges_node_link {
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
  item: feed_itemsConnection_edges_node_link_item | null;
}

export interface feed_itemsConnection_edges_node_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_file_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: feed_itemsConnection_edges_node_file_item_labels[];
}

export interface feed_itemsConnection_edges_node_file {
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
  item: feed_itemsConnection_edges_node_file_item;
}

export interface feed_itemsConnection_edges_node_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_note_item {
  __typename: "Item";
  id: string;
  type: string;
  labels: feed_itemsConnection_edges_node_note_item_labels[];
}

export interface feed_itemsConnection_edges_node_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  item: feed_itemsConnection_edges_node_note_item | null;
}

export interface feed_itemsConnection_edges_node {
  __typename: "Item";
  id: string;
  type: string;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: feed_itemsConnection_edges_node_labels[];
  link: feed_itemsConnection_edges_node_link | null;
  file: feed_itemsConnection_edges_node_file | null;
  note: feed_itemsConnection_edges_node_note | null;
}

export interface feed_itemsConnection_edges {
  __typename: "ItemEdge";
  cursor: string;
  node: feed_itemsConnection_edges_node;
}

export interface feed_itemsConnection {
  __typename: "ItemConnection";
  pageInfo: feed_itemsConnection_pageInfo;
  edges: feed_itemsConnection_edges[];
}

export interface feed {
  itemsConnection: feed_itemsConnection;
}

export interface feedVariables {
  first?: number | null;
  after?: string | null;
  filters?: Filter[] | null;
}
