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

export enum ItemType {
  file = "file",
  link = "link",
  note = "note",
}

export interface BooleanFilter {
  equals?: boolean | null;
  not?: boolean | null;
}

export interface DateTimeFilter {
  equals?: any | null;
  not?: any | null;
  in?: any[] | null;
  notIn?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  gt?: any | null;
  gte?: any | null;
}

export interface FileFilter {
  every?: FileWhereInput | null;
  some?: FileWhereInput | null;
  none?: FileWhereInput | null;
}

export interface FileWhereInput {
  createdAt?: DateTimeFilter | null;
  extension?: StringFilter | null;
  hasStartedUploading?: NullableBooleanFilter | null;
  height?: NullableIntFilter | null;
  id?: StringFilter | null;
  isFailed?: NullableBooleanFilter | null;
  isUploaded?: NullableBooleanFilter | null;
  name?: StringFilter | null;
  size?: NullableStringFilter | null;
  updatedAt?: DateTimeFilter | null;
  width?: NullableIntFilter | null;
  AND?: FileWhereInput[] | null;
  OR?: FileWhereInput[] | null;
  NOT?: FileWhereInput[] | null;
  item?: ItemWhereInput | null;
  uploadGroup?: UploadGroupWhereInput | null;
  user?: UserWhereInput | null;
}

export interface GoogleAccountFilter {
  every?: GoogleAccountWhereInput | null;
  some?: GoogleAccountWhereInput | null;
  none?: GoogleAccountWhereInput | null;
}

export interface GoogleAccountWhereInput {
  accountId?: NullableStringFilter | null;
  createdAt?: DateTimeFilter | null;
  email?: NullableStringFilter | null;
  firstName?: NullableStringFilter | null;
  id?: StringFilter | null;
  lastName?: NullableStringFilter | null;
  picture?: NullableStringFilter | null;
  refreshToken?: NullableStringFilter | null;
  updatedAt?: DateTimeFilter | null;
  AND?: GoogleAccountWhereInput[] | null;
  OR?: GoogleAccountWhereInput[] | null;
  NOT?: GoogleAccountWhereInput[] | null;
  user?: UserWhereInput | null;
}

export interface ItemFilter {
  every?: ItemWhereInput | null;
  some?: ItemWhereInput | null;
  none?: ItemWhereInput | null;
}

export interface ItemWhereInput {
  createdAt?: DateTimeFilter | null;
  id?: StringFilter | null;
  isFavorited?: BooleanFilter | null;
  status?: NullableStringFilter | null;
  type?: StringFilter | null;
  updatedAt?: DateTimeFilter | null;
  labels?: LabelFilter | null;
  AND?: ItemWhereInput[] | null;
  OR?: ItemWhereInput[] | null;
  NOT?: ItemWhereInput[] | null;
  link?: LinkWhereInput | null;
  note?: NoteWhereInput | null;
  user?: UserWhereInput | null;
  file?: FileWhereInput | null;
}

export interface LabelFilter {
  every?: LabelWhereInput | null;
  some?: LabelWhereInput | null;
  none?: LabelWhereInput | null;
}

export interface LabelWhereInput {
  createdAt?: DateTimeFilter | null;
  id?: StringFilter | null;
  name?: StringFilter | null;
  updatedAt?: DateTimeFilter | null;
  items?: ItemFilter | null;
  AND?: LabelWhereInput[] | null;
  OR?: LabelWhereInput[] | null;
  NOT?: LabelWhereInput[] | null;
  user?: UserWhereInput | null;
}

export interface LinkFilter {
  every?: LinkWhereInput | null;
  some?: LinkWhereInput | null;
  none?: LinkWhereInput | null;
}

export interface LinkWhereInput {
  createdAt?: DateTimeFilter | null;
  description?: NullableStringFilter | null;
  favicon?: NullableStringFilter | null;
  href?: StringFilter | null;
  id?: StringFilter | null;
  image?: NullableStringFilter | null;
  notes?: StringFilter | null;
  title?: NullableStringFilter | null;
  updatedAt?: DateTimeFilter | null;
  AND?: LinkWhereInput[] | null;
  OR?: LinkWhereInput[] | null;
  NOT?: LinkWhereInput[] | null;
  user?: UserWhereInput | null;
  item?: ItemWhereInput | null;
}

export interface NoteFilter {
  every?: NoteWhereInput | null;
  some?: NoteWhereInput | null;
  none?: NoteWhereInput | null;
}

export interface NoteWhereInput {
  createdAt?: DateTimeFilter | null;
  id?: StringFilter | null;
  raw?: StringFilter | null;
  text?: StringFilter | null;
  updatedAt?: DateTimeFilter | null;
  AND?: NoteWhereInput[] | null;
  OR?: NoteWhereInput[] | null;
  NOT?: NoteWhereInput[] | null;
  user?: UserWhereInput | null;
  item?: ItemWhereInput | null;
}

export interface NullableBooleanFilter {
  equals?: boolean | null;
  not?: boolean | null;
}

export interface NullableIntFilter {
  equals?: number | null;
  not?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
}

export interface NullableStringFilter {
  equals?: string | null;
  not?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
}

export interface SignedURLArgs {
  name: string;
  key: string;
  type: string;
}

export interface StringFilter {
  equals?: string | null;
  not?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
}

export interface UploadGroupFilter {
  every?: UploadGroupWhereInput | null;
  some?: UploadGroupWhereInput | null;
  none?: UploadGroupWhereInput | null;
}

export interface UploadGroupWhereInput {
  createdAt?: DateTimeFilter | null;
  id?: StringFilter | null;
  isComplete?: NullableBooleanFilter | null;
  isFailed?: NullableBooleanFilter | null;
  updatedAt?: DateTimeFilter | null;
  files?: FileFilter | null;
  AND?: UploadGroupWhereInput[] | null;
  OR?: UploadGroupWhereInput[] | null;
  NOT?: UploadGroupWhereInput[] | null;
  user?: UserWhereInput | null;
}

export interface UserWhereInput {
  email?: StringFilter | null;
  firstName?: NullableStringFilter | null;
  id?: StringFilter | null;
  lastName?: NullableStringFilter | null;
  files?: FileFilter | null;
  googleAccounts?: GoogleAccountFilter | null;
  items?: ItemFilter | null;
  labels?: LabelFilter | null;
  links?: LinkFilter | null;
  notes?: NoteFilter | null;
  uploadGroups?: UploadGroupFilter | null;
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
