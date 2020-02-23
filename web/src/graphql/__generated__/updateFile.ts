/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateFile
// ====================================================

export interface updateFile_updateFile_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface updateFile_updateFile_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: updateFile_updateFile_item_labels[];
}

export interface updateFile_updateFile {
  __typename: "File";
  id: string;
  name: string;
  extension: string;
  title: string;
  description: string;
  originalName: string;
  isUploaded: boolean | null;
  fullUrl: string;
  squareUrl: string;
  createdAt: any;
  updatedAt: any;
  item: updateFile_updateFile_item;
}

export interface updateFile {
  updateFile: updateFile_updateFile;
}

export interface updateFileVariables {
  fileId: string;
  description?: string | null;
  title?: string | null;
}
