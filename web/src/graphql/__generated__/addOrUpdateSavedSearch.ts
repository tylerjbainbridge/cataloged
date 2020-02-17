/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FilterInput } from "./apolloTypes";

// ====================================================
// GraphQL mutation operation: addOrUpdateSavedSearch
// ====================================================

export interface addOrUpdateSavedSearch_addOrUpdateSavedSearch_filters {
  __typename: "Filter";
  name: string;
  value: any | null;
  values: any[] | null;
}

export interface addOrUpdateSavedSearch_addOrUpdateSavedSearch {
  __typename: "SavedSearch";
  id: string;
  name: string;
  filters: addOrUpdateSavedSearch_addOrUpdateSavedSearch_filters[];
}

export interface addOrUpdateSavedSearch {
  addOrUpdateSavedSearch: addOrUpdateSavedSearch_addOrUpdateSavedSearch;
}

export interface addOrUpdateSavedSearchVariables {
  savedSearchId?: string | null;
  name: string;
  filters: FilterInput[];
}
