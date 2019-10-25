/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUploadGroups
// ====================================================

export interface getUploadGroups_uploadGroups_files {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  isUploaded: boolean;
}

export interface getUploadGroups_uploadGroups {
  __typename: "UploadGroup";
  id: string;
  isComplete: boolean;
  files: getUploadGroups_uploadGroups_files[] | null;
}

export interface getUploadGroups {
  uploadGroups: getUploadGroups_uploadGroups[];
}
