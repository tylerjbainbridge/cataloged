/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: batchUpdateItemCollections
// ====================================================

export interface batchUpdateItemCollections_batchUpdateItemCollections {
  __typename: "Item";
  id: string;
}

export interface batchUpdateItemCollections {
  batchUpdateItemCollections: batchUpdateItemCollections_batchUpdateItemCollections[];
}

export interface batchUpdateItemCollectionsVariables {
  itemIds: string[];
  collectionIdsToAdd: string[];
  collectionIdsToRemove: string[];
}
