/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewCollectionEntryInput } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: addEntryToCollection
// ====================================================

export interface addEntryToCollection_addEntryToCollection {
  __typename: "Collection";
  id: string;
}

export interface addEntryToCollection {
  addEntryToCollection: addEntryToCollection_addEntryToCollection;
}

export interface addEntryToCollectionVariables {
  collectionId: string;
  entryInput: NewCollectionEntryInput;
}
