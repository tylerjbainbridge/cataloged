/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemWhereInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: feed
// ====================================================

export interface feed_items_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface feed_items_link {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  image: string | null;
  favicon: string | null;
  title: string | null;
  description: string | null;
}

export interface feed_items_file {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean | null;
  fullUrl: string;
  squareUrl: string;
}

export interface feed_items_note {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
}

export interface feed_items {
  __typename: "Item";
  id: string;
  type: string;
  labels: feed_items_labels[];
  link: feed_items_link | null;
  file: feed_items_file | null;
  note: feed_items_note | null;
}

export interface feed {
  items: feed_items[];
}

export interface feedVariables {
  first?: number | null;
  skip?: number | null;
  where?: ItemWhereInput | null;
}
