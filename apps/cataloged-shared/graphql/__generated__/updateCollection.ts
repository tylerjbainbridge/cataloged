/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCollection
// ====================================================

export interface updateCollection_updateCollection {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface updateCollection {
  updateCollection: updateCollection_updateCollection;
}

export interface updateCollectionVariables {
  collectionId: string;
  name: string;
  description?: string | null;
}
