/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: connectItemToItem
// ====================================================

export interface connectItemToItem_connectItemToItem_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface connectItemToItem_connectItemToItem_items_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface connectItemToItem_connectItemToItem_items_link {
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

export interface connectItemToItem_connectItemToItem_items_file {
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

export interface connectItemToItem_connectItemToItem_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface connectItemToItem_connectItemToItem_items_googleContact {
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

export interface connectItemToItem_connectItemToItem_items {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  isFavorited: boolean;
  status: ItemStatus;
  labels: connectItemToItem_connectItemToItem_items_labels[];
  collections: connectItemToItem_connectItemToItem_items_collections[];
  link: connectItemToItem_connectItemToItem_items_link | null;
  file: connectItemToItem_connectItemToItem_items_file | null;
  note: connectItemToItem_connectItemToItem_items_note | null;
  googleContact: connectItemToItem_connectItemToItem_items_googleContact | null;
}

export interface connectItemToItem_connectItemToItem {
  __typename: "Item";
  id: string;
  items: connectItemToItem_connectItemToItem_items[];
}

export interface connectItemToItem {
  connectItemToItem: connectItemToItem_connectItemToItem[];
}

export interface connectItemToItemVariables {
  itemOneId: string;
  itemTwoId: string;
}
