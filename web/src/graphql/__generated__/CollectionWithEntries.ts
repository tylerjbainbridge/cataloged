/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionWithEntries
// ====================================================

export interface CollectionWithEntries_entries {
  __typename: "CollectionEntry";
  id: string;
  position: number | null;
}

export interface CollectionWithEntries {
  __typename: "Collection";
  id: string;
  entries: CollectionWithEntries_entries[];
}
