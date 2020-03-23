/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNote
// ====================================================

export interface createNote_createNote {
  __typename: "Note";
  id: string;
  raw: string;
  text: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface createNote {
  createNote: createNote_createNote;
}

export interface createNoteVariables {
  raw: string;
  text: string;
}
