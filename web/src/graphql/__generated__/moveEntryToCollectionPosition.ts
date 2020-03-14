/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: moveEntryToCollectionPosition
// ====================================================

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_block {
  __typename: "CollectionBlock";
  id: string;
  type: string;
  content: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link_item | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file_item;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note_item | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link_item | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file_item;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note_item | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact_item;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_labels[];
  collections: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_collections[];
  link: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_link | null;
  file: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_file | null;
  note: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_note | null;
  googleContact: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items_googleContact | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact_item_labels[];
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact {
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
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact_item;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_labels[];
  collections: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_collections[];
  link: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_link | null;
  file: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_file | null;
  note: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_note | null;
  items: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_items[];
  googleContact: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item_googleContact | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries {
  __typename: "CollectionEntry";
  id: string;
  position: number | null;
  block: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_block | null;
  item: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries_item | null;
}

export interface moveEntryToCollectionPosition_moveEntryToCollectionPosition {
  __typename: "Collection";
  id: string;
  name: string;
  entries: moveEntryToCollectionPosition_moveEntryToCollectionPosition_entries[];
}

export interface moveEntryToCollectionPosition {
  moveEntryToCollectionPosition: moveEntryToCollectionPosition_moveEntryToCollectionPosition;
}

export interface moveEntryToCollectionPositionVariables {
  collectionId: string;
  entryId?: string | null;
  position: number;
}
