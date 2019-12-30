/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNote
// ====================================================

export interface createNote_createNote {
  __typename: "Note";
  id: string;
}

export interface createNote {
  createNote: createNote_createNote;
}

export interface createNoteVariables {
  raw: string;
  text: string;
}
