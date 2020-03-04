/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addCollection
// ====================================================

export interface addCollection_addCollection {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface addCollection {
  addCollection: addCollection_addCollection;
}

export interface addCollectionVariables {
  collectionId: string;
  name: string;
  description?: string | null;
}
