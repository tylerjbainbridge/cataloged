/* tslint:disable */
/* eslint-disable */
// @generated
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
  date: any;
  createdAt: any;
  updatedAt: any;
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

export interface ItemConnectionFull_edges_node_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemConnectionFull_edges_node_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemConnectionFull_edges_node_file_item_labels[];
}

export interface ItemConnectionFull_edges_node_file {
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
  item: ItemConnectionFull_edges_node_file_item;
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
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemConnectionFull_edges_node_note_item_labels[];
}

export interface ItemConnectionFull_edges_node_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: ItemConnectionFull_edges_node_note_item | null;
}

export interface ItemConnectionFull_edges_node_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemConnectionFull_edges_node_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemConnectionFull_edges_node_googleContact_item_labels[];
}

export interface ItemConnectionFull_edges_node_googleContact {
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
  item: ItemConnectionFull_edges_node_googleContact_item;
}

export interface ItemConnectionFull_edges_node {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: ItemConnectionFull_edges_node_labels[];
  link: ItemConnectionFull_edges_node_link | null;
  file: ItemConnectionFull_edges_node_file | null;
  note: ItemConnectionFull_edges_node_note | null;
  googleContact: ItemConnectionFull_edges_node_googleContact | null;
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
