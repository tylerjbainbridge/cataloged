/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL query operation: getItem
// ====================================================

export interface getItem_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface getItem_item_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface getItem_item_link {
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

export interface getItem_item_file {
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

export interface getItem_item_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface getItem_item_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface getItem_item_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface getItem_item_items_link {
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

export interface getItem_item_items_file {
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

export interface getItem_item_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface getItem_item_items_googleContact {
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

export interface getItem_item_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: getItem_item_items_labels[];
  collections: getItem_item_items_collections[];
  link: getItem_item_items_link | null;
  file: getItem_item_items_file | null;
  note: getItem_item_items_note | null;
  googleContact: getItem_item_items_googleContact | null;
}

export interface getItem_item_googleContact {
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

export interface getItem_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: getItem_item_labels[];
  collections: getItem_item_collections[];
  link: getItem_item_link | null;
  file: getItem_item_file | null;
  note: getItem_item_note | null;
  items: getItem_item_items[];
  googleContact: getItem_item_googleContact | null;
}

export interface getItem {
  item: getItem_item;
}

export interface getItemVariables {
  id: string;
}
