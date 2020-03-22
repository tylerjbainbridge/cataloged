/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemWithCollections
// ====================================================

export interface ItemWithCollections_collections {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface ItemWithCollections {
  __typename: "Item";
  id: string;
  collections: ItemWithCollections_collections[];
}
