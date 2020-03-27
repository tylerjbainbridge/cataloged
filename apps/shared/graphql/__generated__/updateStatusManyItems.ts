/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemStatus } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: updateStatusManyItems
// ====================================================

export interface updateStatusManyItems_updateStatusManyItems {
  __typename: "Item";
  id: string;
  status: ItemStatus;
}

export interface updateStatusManyItems {
  updateStatusManyItems: updateStatusManyItems_updateStatusManyItems[];
}

export interface updateStatusManyItemsVariables {
  itemIds: string[];
  status: ItemStatus;
}
