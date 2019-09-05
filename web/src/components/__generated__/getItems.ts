/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getItems
// ====================================================

export interface getItems_items_link {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
}

export interface getItems_items_file {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean;
  fullUrl: string;
  squareUrl: string;
}

export interface getItems_items {
  __typename: "Item";
  type: string;
  link: getItems_items_link | null;
  file: getItems_items_file | null;
}

export interface getItems {
  items: getItems_items[];
}

export interface getItemsVariables {
  first?: number | null;
  skip?: number | null;
}
