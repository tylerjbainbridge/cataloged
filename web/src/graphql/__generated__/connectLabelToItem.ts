/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: connectLabelToItem
// ====================================================

export interface connectLabelToItem_connectLabelToItem_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface connectLabelToItem_connectLabelToItem {
  __typename: "Item";
  id: string;
  labels: connectLabelToItem_connectLabelToItem_labels[];
}

export interface connectLabelToItem {
  connectLabelToItem: connectLabelToItem_connectLabelToItem;
}

export interface connectLabelToItemVariables {
  name: string;
  itemId: string;
}
