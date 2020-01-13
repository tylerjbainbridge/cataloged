/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: batchUpdateItemLabels
// ====================================================

export interface batchUpdateItemLabels_batchUpdateItemLabels_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface batchUpdateItemLabels_batchUpdateItemLabels {
  __typename: "Item";
  id: string;
  labels: batchUpdateItemLabels_batchUpdateItemLabels_labels[];
}

export interface batchUpdateItemLabels {
  batchUpdateItemLabels: batchUpdateItemLabels_batchUpdateItemLabels[];
}

export interface batchUpdateItemLabelsVariables {
  itemIds: string[];
  labelIdsToAdd: string[];
  labelIdsToRemove: string[];
}
