/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemLabelResponseFragment
// ====================================================

export interface ItemLabelResponseFragment_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface ItemLabelResponseFragment {
  __typename: "Item";
  id: string;
  labels: ItemLabelResponseFragment_labels[];
}
