/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterInput, ItemStatus } from "./apolloTypes";

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

export interface feed_itemsConnection_edges_node_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
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
  date: any;
  createdAt: any;
  updatedAt: any;
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
  date: any;
  createdAt: any;
  updatedAt: any;
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
  contentType: string | null;
  originalUrl: string;
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
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_note_item_labels[];
}

export interface feed_itemsConnection_edges_node_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: feed_itemsConnection_edges_node_note_item | null;
}

export interface feed_itemsConnection_edges_node_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface feed_itemsConnection_edges_node_items_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_items_link_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_items_link_item_labels[];
}

export interface feed_itemsConnection_edges_node_items_link {
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
  item: feed_itemsConnection_edges_node_items_link_item | null;
}

export interface feed_itemsConnection_edges_node_items_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_items_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_items_file_item_labels[];
}

export interface feed_itemsConnection_edges_node_items_file {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  title: string;
  description: string;
  originalName: string;
  isUploaded: boolean | null;
  contentType: string | null;
  originalUrl: string;
  fullUrl: string;
  squareUrl: string;
  createdAt: any;
  updatedAt: any;
  item: feed_itemsConnection_edges_node_items_file_item;
}

export interface feed_itemsConnection_edges_node_items_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_items_note_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_items_note_item_labels[];
}

export interface feed_itemsConnection_edges_node_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: feed_itemsConnection_edges_node_items_note_item | null;
}

export interface feed_itemsConnection_edges_node_items_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_items_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_items_googleContact_item_labels[];
}

export interface feed_itemsConnection_edges_node_items_googleContact {
  __typename: "GoogleContact";
  id: string;
  resourceName: string;
  photoUrl: string | null;
  name: string | null;
  email: string | null;
  otherEmails: string[];
  phoneNumber: string | null;
  otherPhoneNumbers: string[];
  companyTitle: string | null;
  companyName: string | null;
  item: feed_itemsConnection_edges_node_items_googleContact_item;
}

export interface feed_itemsConnection_edges_node_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: feed_itemsConnection_edges_node_items_labels[];
  collections: feed_itemsConnection_edges_node_items_collections[];
  link: feed_itemsConnection_edges_node_items_link | null;
  file: feed_itemsConnection_edges_node_items_file | null;
  note: feed_itemsConnection_edges_node_items_note | null;
  googleContact: feed_itemsConnection_edges_node_items_googleContact | null;
}

export interface feed_itemsConnection_edges_node_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_itemsConnection_edges_node_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: feed_itemsConnection_edges_node_googleContact_item_labels[];
}

export interface feed_itemsConnection_edges_node_googleContact {
  __typename: "GoogleContact";
  id: string;
  resourceName: string;
  photoUrl: string | null;
  name: string | null;
  email: string | null;
  otherEmails: string[];
  phoneNumber: string | null;
  otherPhoneNumbers: string[];
  companyTitle: string | null;
  companyName: string | null;
  item: feed_itemsConnection_edges_node_googleContact_item;
}

export interface feed_itemsConnection_edges_node {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: feed_itemsConnection_edges_node_labels[];
  collections: feed_itemsConnection_edges_node_collections[];
  link: feed_itemsConnection_edges_node_link | null;
  file: feed_itemsConnection_edges_node_file | null;
  note: feed_itemsConnection_edges_node_note | null;
  items: feed_itemsConnection_edges_node_items[];
  googleContact: feed_itemsConnection_edges_node_googleContact | null;
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
  filters?: FilterInput[] | null;
}
