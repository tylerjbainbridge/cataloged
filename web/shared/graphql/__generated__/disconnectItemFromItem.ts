/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: disconnectItemFromItem
// ====================================================

export interface disconnectItemFromItem_disconnectItemFromItem_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_link_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: disconnectItemFromItem_disconnectItemFromItem_items_link_item_labels[];
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_link {
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
  item: disconnectItemFromItem_disconnectItemFromItem_items_link_item | null;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: disconnectItemFromItem_disconnectItemFromItem_items_file_item_labels[];
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_file {
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
  item: disconnectItemFromItem_disconnectItemFromItem_items_file_item;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_note_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: disconnectItemFromItem_disconnectItemFromItem_items_note_item_labels[];
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: disconnectItemFromItem_disconnectItemFromItem_items_note_item | null;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: disconnectItemFromItem_disconnectItemFromItem_items_googleContact_item_labels[];
}

export interface disconnectItemFromItem_disconnectItemFromItem_items_googleContact {
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
  item: disconnectItemFromItem_disconnectItemFromItem_items_googleContact_item;
}

export interface disconnectItemFromItem_disconnectItemFromItem_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: disconnectItemFromItem_disconnectItemFromItem_items_labels[];
  collections: disconnectItemFromItem_disconnectItemFromItem_items_collections[];
  link: disconnectItemFromItem_disconnectItemFromItem_items_link | null;
  file: disconnectItemFromItem_disconnectItemFromItem_items_file | null;
  note: disconnectItemFromItem_disconnectItemFromItem_items_note | null;
  googleContact: disconnectItemFromItem_disconnectItemFromItem_items_googleContact | null;
}

export interface disconnectItemFromItem_disconnectItemFromItem {
  __typename: "Item";
  id: string;
  items: disconnectItemFromItem_disconnectItemFromItem_items[];
}

export interface disconnectItemFromItem {
  disconnectItemFromItem: disconnectItemFromItem_disconnectItemFromItem[];
}

export interface disconnectItemFromItemVariables {
  itemOneId: string;
  itemTwoId: string;
}
