/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: processFiles
// ====================================================

export interface processFiles_processFiles {
  __typename: "File";
  id: string;
  squareUrl: string;
  fullUrl: string;
}

export interface processFiles {
  processFiles: processFiles_processFiles[];
}

export interface processFilesVariables {
  uploadGroupId?: string | null;
}
