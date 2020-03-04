/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBlockContent
// ====================================================

export interface updateBlockContent_updateBlockContent {
  __typename: "CollectionBlock";
  id: string;
}

export interface updateBlockContent {
  updateBlockContent: updateBlockContent_updateBlockContent;
}

export interface updateBlockContentVariables {
  collectionId: string;
  blockId: string;
  content?: string | null;
}
