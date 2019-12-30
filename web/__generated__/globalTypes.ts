/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  name?: StringFilter | null;
  extension?: StringFilter | null;
  size?: NullableStringFilter | null;
  width?: NullableIntFilter | null;
  height?: NullableIntFilter | null;
  isUploaded?: NullableBooleanFilter | null;
  hasStartedUploading?: NullableBooleanFilter | null;
  isFailed?: NullableBooleanFilter | null;
  AND?: FileWhereInput[] | null;
  OR?: FileWhereInput[] | null;
  NOT?: FileWhereInput[] | null;
  item?: ItemWhereInput | null;
  user?: UserWhereInput | null;
  uploadGroup?: UploadGroupWhereInput | null;
}

export interface GoogleAccountFilter {
  every?: GoogleAccountWhereInput | null;
  some?: GoogleAccountWhereInput | null;
  none?: GoogleAccountWhereInput | null;
}

export interface GoogleAccountWhereInput {
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  accountId?: NullableStringFilter | null;
  email?: NullableStringFilter | null;
  firstName?: NullableStringFilter | null;
  lastName?: NullableStringFilter | null;
  picture?: NullableStringFilter | null;
  refreshToken?: NullableStringFilter | null;
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
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  type?: StringFilter | null;
  labels?: LabelFilter | null;
  AND?: ItemWhereInput[] | null;
  OR?: ItemWhereInput[] | null;
  NOT?: ItemWhereInput[] | null;
  file?: FileWhereInput | null;
  link?: LinkWhereInput | null;
  note?: NoteWhereInput | null;
  user?: UserWhereInput | null;
}

export interface LabelFilter {
  every?: LabelWhereInput | null;
  some?: LabelWhereInput | null;
  none?: LabelWhereInput | null;
}

export interface LabelWhereInput {
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  name?: StringFilter | null;
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
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  href?: StringFilter | null;
  title?: NullableStringFilter | null;
  description?: NullableStringFilter | null;
  image?: NullableStringFilter | null;
  favicon?: NullableStringFilter | null;
  notes?: StringFilter | null;
  AND?: LinkWhereInput[] | null;
  OR?: LinkWhereInput[] | null;
  NOT?: LinkWhereInput[] | null;
  item?: ItemWhereInput | null;
  user?: UserWhereInput | null;
}

export interface NoteFilter {
  every?: NoteWhereInput | null;
  some?: NoteWhereInput | null;
  none?: NoteWhereInput | null;
}

export interface NoteWhereInput {
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  raw?: StringFilter | null;
  text?: StringFilter | null;
  AND?: NoteWhereInput[] | null;
  OR?: NoteWhereInput[] | null;
  NOT?: NoteWhereInput[] | null;
  item?: ItemWhereInput | null;
  user?: UserWhereInput | null;
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
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  isComplete?: NullableBooleanFilter | null;
  isFailed?: NullableBooleanFilter | null;
  files?: FileFilter | null;
  AND?: UploadGroupWhereInput[] | null;
  OR?: UploadGroupWhereInput[] | null;
  NOT?: UploadGroupWhereInput[] | null;
  user?: UserWhereInput | null;
}

export interface UserWhereInput {
  id?: StringFilter | null;
  email?: StringFilter | null;
  firstName?: NullableStringFilter | null;
  lastName?: NullableStringFilter | null;
  googleAccounts?: GoogleAccountFilter | null;
  items?: ItemFilter | null;
  labels?: LabelFilter | null;
  files?: FileFilter | null;
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
