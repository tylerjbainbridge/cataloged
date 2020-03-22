/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ItemStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
}

export interface CollectionEntryPositionInput {
  id?: string | null;
  position?: number | null;
}

export interface FilterInput {
  name: string;
  display?: string | null;
  value?: any | null;
  values?: any[] | null;
}

export interface NewCollectionEntryInput {
  entryId?: string | null;
  blockId?: string | null;
  blockType?: string | null;
  blockContent?: string | null;
  position?: number | null;
  itemId?: string | null;
}

export interface SignedURLArgs {
  name: string;
  type: string;
  size: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
