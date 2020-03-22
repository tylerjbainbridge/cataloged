/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL fragment: CollectionFull
// ====================================================

export interface CollectionFull_entries_block {
  __typename: "CollectionBlock";
  id: string;
  type: string;
  content: string;
}

export interface CollectionFull_entries_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface CollectionFull_entries_item_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface CollectionFull_entries_item_link {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
  image: string | null;
  favicon: string | null;
  logo: string | null;
  title: string | null;
  description: string | null;
  host: string | null;
  isIframeDisabled: boolean;
}

export interface CollectionFull_entries_item_file {
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

export interface CollectionFull_entries_item_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface CollectionFull_entries_item_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface CollectionFull_entries_item_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface CollectionFull_entries_item_items_link {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
  image: string | null;
  favicon: string | null;
  logo: string | null;
  title: string | null;
  description: string | null;
  host: string | null;
  isIframeDisabled: boolean;
}

export interface CollectionFull_entries_item_items_file {
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

export interface CollectionFull_entries_item_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface CollectionFull_entries_item_items_googleContact {
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

export interface CollectionFull_entries_item_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: CollectionFull_entries_item_items_labels[];
  collections: CollectionFull_entries_item_items_collections[];
  link: CollectionFull_entries_item_items_link | null;
  file: CollectionFull_entries_item_items_file | null;
  note: CollectionFull_entries_item_items_note | null;
  googleContact: CollectionFull_entries_item_items_googleContact | null;
}

export interface CollectionFull_entries_item_googleContact {
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

export interface CollectionFull_entries_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: CollectionFull_entries_item_labels[];
  collections: CollectionFull_entries_item_collections[];
  link: CollectionFull_entries_item_link | null;
  file: CollectionFull_entries_item_file | null;
  note: CollectionFull_entries_item_note | null;
  items: CollectionFull_entries_item_items[];
  googleContact: CollectionFull_entries_item_googleContact | null;
}

export interface CollectionFull_entries {
  __typename: "CollectionEntry";
  id: string;
  position: number | null;
  block: CollectionFull_entries_block | null;
  item: CollectionFull_entries_item | null;
}

export interface CollectionFull {
  __typename: "Collection";
  id: string;
  name: string;
  entries: CollectionFull_entries[];
}
