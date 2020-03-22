/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mostRecentItem
// ====================================================

export interface mostRecentItem_mostRecentItem_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface mostRecentItem_mostRecentItem_link {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  image: string | null;
  favicon: string | null;
  title: string | null;
  description: string | null;
}

export interface mostRecentItem_mostRecentItem_file {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean | null;
  fullUrl: string;
  squareUrl: string;
}

export interface mostRecentItem_mostRecentItem {
  __typename: "Item";
  id: string;
  type: string;
  labels: mostRecentItem_mostRecentItem_labels[];
  link: mostRecentItem_mostRecentItem_link | null;
  file: mostRecentItem_mostRecentItem_file | null;
}

export interface mostRecentItem {
  mostRecentItem: mostRecentItem_mostRecentItem | null;
}

export interface mostRecentItemVariables {
  type?: string | null;
}
