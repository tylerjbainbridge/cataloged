/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateFile
// ====================================================

export interface updateFile_updateFile {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  title: string;
  description: string;
  originalName: string;
  isUploaded: boolean | null;
  contentType: string | null;
  originalUrl: string;
  fullUrl: string;
  squareUrl: string;
  createdAt: any;
  updatedAt: any;
}

export interface updateFile {
  updateFile: updateFile_updateFile;
}

export interface updateFileVariables {
  fileId: string;
  description?: string | null;
  title?: string | null;
}
