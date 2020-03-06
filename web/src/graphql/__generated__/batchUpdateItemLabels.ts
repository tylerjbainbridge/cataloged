/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: batchUpdateItemLabels
// ====================================================

export interface batchUpdateItemLabels_batchUpdateItemLabels {
  __typename: "Item";
  id: string;
}

export interface batchUpdateItemLabels {
  batchUpdateItemLabels: batchUpdateItemLabels_batchUpdateItemLabels[];
}

export interface batchUpdateItemLabelsVariables {
  itemIds: string[];
  labelIdsToAdd: string[];
  labelIdsToRemove: string[];
}
