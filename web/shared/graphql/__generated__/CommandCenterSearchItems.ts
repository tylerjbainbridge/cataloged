/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterInput, ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL query operation: CommandCenterSearchItems
// ====================================================

export interface CommandCenterSearchItems_itemsConnection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_link {
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
  host: string | null;
  isIframeDisabled: boolean;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_file {
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
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_link {
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
  host: string | null;
  isIframeDisabled: boolean;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_file {
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
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items_googleContact {
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
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: CommandCenterSearchItems_itemsConnection_edges_node_items_labels[];
  collections: CommandCenterSearchItems_itemsConnection_edges_node_items_collections[];
  link: CommandCenterSearchItems_itemsConnection_edges_node_items_link | null;
  file: CommandCenterSearchItems_itemsConnection_edges_node_items_file | null;
  note: CommandCenterSearchItems_itemsConnection_edges_node_items_note | null;
  googleContact: CommandCenterSearchItems_itemsConnection_edges_node_items_googleContact | null;
}

export interface CommandCenterSearchItems_itemsConnection_edges_node_googleContact {
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
}

export interface CommandCenterSearchItems_itemsConnection_edges_node {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: CommandCenterSearchItems_itemsConnection_edges_node_labels[];
  collections: CommandCenterSearchItems_itemsConnection_edges_node_collections[];
  link: CommandCenterSearchItems_itemsConnection_edges_node_link | null;
  file: CommandCenterSearchItems_itemsConnection_edges_node_file | null;
  note: CommandCenterSearchItems_itemsConnection_edges_node_note | null;
  items: CommandCenterSearchItems_itemsConnection_edges_node_items[];
  googleContact: CommandCenterSearchItems_itemsConnection_edges_node_googleContact | null;
}

export interface CommandCenterSearchItems_itemsConnection_edges {
  __typename: "ItemEdge";
  cursor: string;
  node: CommandCenterSearchItems_itemsConnection_edges_node;
}

export interface CommandCenterSearchItems_itemsConnection {
  __typename: "ItemConnection";
  pageInfo: CommandCenterSearchItems_itemsConnection_pageInfo;
  edges: CommandCenterSearchItems_itemsConnection_edges[];
}

export interface CommandCenterSearchItems {
  itemsConnection: CommandCenterSearchItems_itemsConnection;
}

export interface CommandCenterSearchItemsVariables {
  first?: number | null;
  after?: string | null;
  filters?: FilterInput[] | null;
}
