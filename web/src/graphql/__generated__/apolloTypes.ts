/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ItemStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
}

export interface Filter {
  name: string;
  operator: string;
  value?: string | null;
  values?: string[] | null;
}

export interface SignedURLArgs {
  name: string;
  key: string;
  type: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
