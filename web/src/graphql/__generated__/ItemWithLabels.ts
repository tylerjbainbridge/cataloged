/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemWithLabels
// ====================================================

export interface ItemWithLabels_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemWithLabels {
  __typename: "Item";
  id: string;
  type: string;
  labels: ItemWithLabels_labels[];
}
