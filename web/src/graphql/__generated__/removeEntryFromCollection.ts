/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeEntryFromCollection
// ====================================================

export interface removeEntryFromCollection_removeEntryFromCollection {
  __typename: "Collection";
  id: string;
}

export interface removeEntryFromCollection {
  removeEntryFromCollection: removeEntryFromCollection_removeEntryFromCollection;
}

export interface removeEntryFromCollectionVariables {
  collectionId: string;
  entryId: string;
}
