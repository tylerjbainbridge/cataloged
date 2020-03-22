/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateNote
// ====================================================

export interface updateNote_updateNote {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface updateNote {
  updateNote: updateNote_updateNote;
}

export interface updateNoteVariables {
  noteId: string;
  raw: string;
  text: string;
  title?: string | null;
}
