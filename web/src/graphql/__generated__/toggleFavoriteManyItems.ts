/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateFavoriteManyItems
// ====================================================

export interface updateFavoriteManyItems_updateFavoriteManyItems {
  __typename: 'Item';
  id: string;
  isFavorited: boolean;
}

export interface updateFavoriteManyItems {
  updateFavoriteManyItems: updateFavoriteManyItems_updateFavoriteManyItems[];
}

export interface updateFavoriteManyItemsVariables {
  itemIds: string[];
  isFavorited: boolean;
}
