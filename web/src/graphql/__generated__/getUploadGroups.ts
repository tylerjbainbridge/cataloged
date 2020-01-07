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
  isUploaded: boolean | null;
}

export interface getUploadGroups_uploadGroups {
  __typename: "UploadGroup";
  id: string;
  isComplete: boolean | null;
  files: getUploadGroups_uploadGroups_files[];
}

export interface getUploadGroups {
  uploadGroups: getUploadGroups_uploadGroups[];
}
