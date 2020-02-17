/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSavedSearches
// ====================================================

export interface getSavedSearches_savedSearches_filters {
  __typename: "Filter";
  name: string;
  operator: string;
  value: any | null;
  values: any[] | null;
}

export interface getSavedSearches_savedSearches {
  __typename: "SavedSearch";
  id: string;
  name: string;
  version: number;
  filters: getSavedSearches_savedSearches_filters[];
}

export interface getSavedSearches {
  savedSearches: getSavedSearches_savedSearches[];
}
