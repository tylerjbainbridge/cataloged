/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionEntryPositionInput } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: updateEntryPositions
// ====================================================

export interface updateEntryPositions_updateEntryPositions {
  __typename: "Collection";
  id: string;
}

export interface updateEntryPositions {
  updateEntryPositions: updateEntryPositions_updateEntryPositions;
}

export interface updateEntryPositionsVariables {
  collectionId: string;
  entries?: CollectionEntryPositionInput[] | null;
}
