/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNote
// ====================================================

export interface createNote_createNote_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface createNote_createNote_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: createNote_createNote_item_labels[];
}

export interface createNote_createNote {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  item: createNote_createNote_item | null;
}

export interface createNote {
  createNote: createNote_createNote;
}

export interface createNoteVariables {
  raw: string;
  text: string;
}
