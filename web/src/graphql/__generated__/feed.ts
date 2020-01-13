/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemType, ItemWhereInput } from './apolloTypes';

// ====================================================
// GraphQL query operation: feed
// ====================================================

export interface feed_itemsConnection_pageInfo {
  __typename: 'PageInfo';
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface feed_itemsConnection_edges_node {
  __typename: 'Item';
  id: string;
}

export interface feed_itemsConnection_edges {
  __typename: 'ItemEdge';
  cursor: string;
  node: feed_itemsConnection_edges_node;
}

export interface feed_itemsConnection {
  __typename: 'ItemConnection';
  pageInfo: feed_itemsConnection_pageInfo;
  edges: feed_itemsConnection_edges[];
}

export interface feed {
  itemsConnection: feed_itemsConnection;
}

export interface feedVariables {
  first?: number | null;
  after?: string | null;
  search?: string | null;
  type?: ItemType | null;
  where?: ItemWhereInput | null;
}
