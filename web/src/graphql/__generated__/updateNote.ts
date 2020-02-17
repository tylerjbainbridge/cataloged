/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateNote
// ====================================================

export interface updateNote_updateNote_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface updateNote_updateNote_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: updateNote_updateNote_item_labels[];
}

export interface updateNote_updateNote {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  item: updateNote_updateNote_item | null;
}

export interface updateNote {
  updateNote: updateNote_updateNote;
}

export interface updateNoteVariables {
  noteId: string;
  raw: string;
  text: string;
}
