/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: disconnectLabelFromItem
// ====================================================

export interface disconnectLabelFromItem_disconnectLabelFromItem_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface disconnectLabelFromItem_disconnectLabelFromItem {
  __typename: "Item";
  id: string;
  labels: disconnectLabelFromItem_disconnectLabelFromItem_labels[];
}

export interface disconnectLabelFromItem {
  disconnectLabelFromItem: disconnectLabelFromItem_disconnectLabelFromItem;
}

export interface disconnectLabelFromItemVariables {
  labelId: string;
  itemId: string;
}
