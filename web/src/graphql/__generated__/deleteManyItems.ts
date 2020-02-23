/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteManyItems
// ====================================================

export interface deleteManyItems_deleteManyItems {
  __typename: "Item";
  id: string;
}

export interface deleteManyItems {
  deleteManyItems: deleteManyItems_deleteManyItems[];
}

export interface deleteManyItemsVariables {
  itemIds: string[];
}
