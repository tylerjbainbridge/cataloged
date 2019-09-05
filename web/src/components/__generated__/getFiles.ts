/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getFiles
// ====================================================

export interface getFiles_uploadGroups_files {
  __typename: "File";
  id: string;
  isUploaded: boolean;
}

export interface getFiles_uploadGroups {
  __typename: "UploadGroup";
  id: string;
  isComplete: boolean;
  files: getFiles_uploadGroups_files[] | null;
}

export interface getFiles_files {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean;
  fullUrl: string;
  squareUrl: string;
}

export interface getFiles {
  uploadGroups: getFiles_uploadGroups[] | null;
  files: getFiles_files[] | null;
}
