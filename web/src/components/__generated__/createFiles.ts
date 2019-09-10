/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { KeyBlob } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createFiles
// ====================================================

export interface createFiles_createFiles {
  __typename: "File";
  id: string;
  squareUrl: string;
  fullUrl: string;
}

export interface createFiles {
  createFiles: createFiles_createFiles[];
}

export interface createFilesVariables {
  files?: any[] | null;
  keyBlobs?: KeyBlob[] | null;
}
