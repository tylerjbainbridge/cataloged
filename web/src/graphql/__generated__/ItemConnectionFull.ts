/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemConnectionFull
// ====================================================

export interface ItemConnectionFull_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ItemConnectionFull_edges_node {
  __typename: "Item";
  id: string;
}

export interface ItemConnectionFull_edges {
  __typename: "ItemEdge";
  cursor: string;
  node: ItemConnectionFull_edges_node;
}

export interface ItemConnectionFull {
  __typename: "ItemConnection";
  pageInfo: ItemConnectionFull_pageInfo;
  edges: ItemConnectionFull_edges[];
}
