/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL fragment: ItemFull
// ====================================================

export interface ItemFull_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemFull_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface ItemFull_link_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemFull_link_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemFull_link_item_labels[];
}

export interface ItemFull_link {
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
  item: ItemFull_link_item | null;
}

export interface ItemFull_file_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemFull_file_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemFull_file_item_labels[];
}

export interface ItemFull_file {
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
  item: ItemFull_file_item;
}

export interface ItemFull_note_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemFull_note_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemFull_note_item_labels[];
}

export interface ItemFull_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  item: ItemFull_note_item | null;
}

export interface ItemFull_googleContact_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemFull_googleContact_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: ItemFull_googleContact_item_labels[];
}

export interface ItemFull_googleContact {
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
  item: ItemFull_googleContact_item;
}

export interface ItemFull {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: ItemFull_labels[];
  collections: ItemFull_collections[];
  link: ItemFull_link | null;
  file: ItemFull_file | null;
  note: ItemFull_note | null;
  googleContact: ItemFull_googleContact | null;
}
