/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */


import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  DateTimeFilter: { // input type
    equals?: any | null; // DateTime
    gt?: any | null; // DateTime
    gte?: any | null; // DateTime
    in?: any[] | null; // [DateTime!]
    lt?: any | null; // DateTime
    lte?: any | null; // DateTime
    not?: any | null; // DateTime
    notIn?: any[] | null; // [DateTime!]
  }
  FileCreateInput: { // input type
    createdAt?: any | null; // DateTime
    extension: string; // String!
    height?: number | null; // Int
    id?: string | null; // ID
    isFailed?: boolean | null; // Boolean
    isUploaded?: boolean | null; // Boolean
    item: NexusGenInputs['ItemCreateOneWithoutItemInput']; // ItemCreateOneWithoutItemInput!
    name: string; // String!
    size?: string | null; // String
    updatedAt?: any | null; // DateTime
    uploadGroup: NexusGenInputs['UploadGroupCreateOneWithoutUploadGroupInput']; // UploadGroupCreateOneWithoutUploadGroupInput!
    user: NexusGenInputs['UserCreateOneWithoutUserInput']; // UserCreateOneWithoutUserInput!
    width?: number | null; // Int
  }
  FileCreateManyWithoutFilesInput: { // input type
    connect?: NexusGenInputs['FileWhereUniqueInput'][] | null; // [FileWhereUniqueInput!]
    create?: NexusGenInputs['FileCreateWithoutUploadGroupInput'][] | null; // [FileCreateWithoutUploadGroupInput!]
  }
  FileCreateOneWithoutFileInput: { // input type
    connect?: NexusGenInputs['FileWhereUniqueInput'] | null; // FileWhereUniqueInput
    create?: NexusGenInputs['FileCreateWithoutItemInput'] | null; // FileCreateWithoutItemInput
  }
  FileCreateWithoutItemInput: { // input type
    createdAt?: any | null; // DateTime
    extension: string; // String!
    height?: number | null; // Int
    id?: string | null; // ID
    isFailed?: boolean | null; // Boolean
    isUploaded?: boolean | null; // Boolean
    name: string; // String!
    size?: string | null; // String
    updatedAt?: any | null; // DateTime
    uploadGroup: NexusGenInputs['UploadGroupCreateOneWithoutUploadGroupInput']; // UploadGroupCreateOneWithoutUploadGroupInput!
    user: NexusGenInputs['UserCreateOneWithoutUserInput']; // UserCreateOneWithoutUserInput!
    width?: number | null; // Int
  }
  FileCreateWithoutUploadGroupInput: { // input type
    createdAt?: any | null; // DateTime
    extension: string; // String!
    height?: number | null; // Int
    id?: string | null; // ID
    isFailed?: boolean | null; // Boolean
    isUploaded?: boolean | null; // Boolean
    item: NexusGenInputs['ItemCreateOneWithoutItemInput']; // ItemCreateOneWithoutItemInput!
    name: string; // String!
    size?: string | null; // String
    updatedAt?: any | null; // DateTime
    user: NexusGenInputs['UserCreateOneWithoutUserInput']; // UserCreateOneWithoutUserInput!
    width?: number | null; // Int
  }
  FileFilter: { // input type
    every?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
    none?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
    some?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
  }
  FileOrderByInput: { // input type
    createdAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    extension?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    height?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    isFailed?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    isUploaded?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    name?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    size?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    updatedAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    width?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
  FileWhereInput: { // input type
    AND?: NexusGenInputs['FileWhereInput'][] | null; // [FileWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    extension?: NexusGenInputs['StringFilter'] | null; // StringFilter
    height?: NexusGenInputs['NullableIntFilter'] | null; // NullableIntFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    isFailed?: NexusGenInputs['NullableBooleanFilter'] | null; // NullableBooleanFilter
    isUploaded?: NexusGenInputs['NullableBooleanFilter'] | null; // NullableBooleanFilter
    item?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['FileWhereInput'][] | null; // [FileWhereInput!]
    OR?: NexusGenInputs['FileWhereInput'][] | null; // [FileWhereInput!]
    size?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    uploadGroup?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    width?: NexusGenInputs['NullableIntFilter'] | null; // NullableIntFilter
  }
  FileWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  GoogleAccountCreateManyWithoutGoogleAccountsInput: { // input type
    connect?: NexusGenInputs['GoogleAccountWhereUniqueInput'][] | null; // [GoogleAccountWhereUniqueInput!]
    create?: NexusGenInputs['GoogleAccountCreateWithoutUserInput'][] | null; // [GoogleAccountCreateWithoutUserInput!]
  }
  GoogleAccountCreateWithoutUserInput: { // input type
    accountId?: string | null; // String
    createdAt?: any | null; // DateTime
    email?: string | null; // String
    firstName?: string | null; // String
    id?: string | null; // ID
    lastName?: string | null; // String
    picture?: string | null; // String
    refreshToken?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  GoogleAccountFilter: { // input type
    every?: NexusGenInputs['GoogleAccountWhereInput'] | null; // GoogleAccountWhereInput
    none?: NexusGenInputs['GoogleAccountWhereInput'] | null; // GoogleAccountWhereInput
    some?: NexusGenInputs['GoogleAccountWhereInput'] | null; // GoogleAccountWhereInput
  }
  GoogleAccountWhereInput: { // input type
    accountId?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    AND?: NexusGenInputs['GoogleAccountWhereInput'][] | null; // [GoogleAccountWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    email?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    firstName?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lastName?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    NOT?: NexusGenInputs['GoogleAccountWhereInput'][] | null; // [GoogleAccountWhereInput!]
    OR?: NexusGenInputs['GoogleAccountWhereInput'][] | null; // [GoogleAccountWhereInput!]
    picture?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    refreshToken?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  GoogleAccountWhereUniqueInput: { // input type
    accountId?: string | null; // String
    id?: string | null; // ID
  }
  ItemCreateManyWithoutItemsInput: { // input type
    connect?: NexusGenInputs['ItemWhereUniqueInput'][] | null; // [ItemWhereUniqueInput!]
    create?: NexusGenInputs['ItemCreateWithoutUserInput'][] | null; // [ItemCreateWithoutUserInput!]
  }
  ItemCreateOneWithoutItemInput: { // input type
    connect?: NexusGenInputs['ItemWhereUniqueInput'] | null; // ItemWhereUniqueInput
    create?: NexusGenInputs['ItemCreateWithoutLinkInput'] | null; // ItemCreateWithoutLinkInput
  }
  ItemCreateWithoutLinkInput: { // input type
    createdAt?: any | null; // DateTime
    file?: NexusGenInputs['FileCreateOneWithoutFileInput'] | null; // FileCreateOneWithoutFileInput
    id?: string | null; // ID
    labels?: NexusGenInputs['LabelCreateManyWithoutLabelsInput'] | null; // LabelCreateManyWithoutLabelsInput
    type: string; // String!
    updatedAt?: any | null; // DateTime
    user?: NexusGenInputs['UserCreateOneWithoutUserInput'] | null; // UserCreateOneWithoutUserInput
  }
  ItemCreateWithoutUserInput: { // input type
    createdAt?: any | null; // DateTime
    file?: NexusGenInputs['FileCreateOneWithoutFileInput'] | null; // FileCreateOneWithoutFileInput
    id?: string | null; // ID
    labels?: NexusGenInputs['LabelCreateManyWithoutLabelsInput'] | null; // LabelCreateManyWithoutLabelsInput
    link?: NexusGenInputs['LinkCreateOneWithoutLinkInput'] | null; // LinkCreateOneWithoutLinkInput
    type: string; // String!
    updatedAt?: any | null; // DateTime
  }
  ItemFilter: { // input type
    every?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    none?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    some?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
  }
  ItemOrderByInput: { // input type
    createdAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    type?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    updatedAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
  ItemWhereInput: { // input type
    AND?: NexusGenInputs['ItemWhereInput'][] | null; // [ItemWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    file?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    labels?: NexusGenInputs['LabelFilter'] | null; // LabelFilter
    link?: NexusGenInputs['LinkWhereInput'] | null; // LinkWhereInput
    NOT?: NexusGenInputs['ItemWhereInput'][] | null; // [ItemWhereInput!]
    OR?: NexusGenInputs['ItemWhereInput'][] | null; // [ItemWhereInput!]
    type?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  ItemWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  KeyBlob: { // input type
    fileId: string; // String!
  }
  LabelCreateManyWithoutLabelsInput: { // input type
    connect?: NexusGenInputs['LabelWhereUniqueInput'][] | null; // [LabelWhereUniqueInput!]
    create?: NexusGenInputs['LabelCreateWithoutUserInput'][] | null; // [LabelCreateWithoutUserInput!]
  }
  LabelCreateWithoutUserInput: { // input type
    createdAt?: any | null; // DateTime
    id?: string | null; // ID
    items?: NexusGenInputs['ItemCreateManyWithoutItemsInput'] | null; // ItemCreateManyWithoutItemsInput
    name: string; // String!
    updatedAt?: any | null; // DateTime
  }
  LabelFilter: { // input type
    every?: NexusGenInputs['LabelWhereInput'] | null; // LabelWhereInput
    none?: NexusGenInputs['LabelWhereInput'] | null; // LabelWhereInput
    some?: NexusGenInputs['LabelWhereInput'] | null; // LabelWhereInput
  }
  LabelWhereInput: { // input type
    AND?: NexusGenInputs['LabelWhereInput'][] | null; // [LabelWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    items?: NexusGenInputs['ItemFilter'] | null; // ItemFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['LabelWhereInput'][] | null; // [LabelWhereInput!]
    OR?: NexusGenInputs['LabelWhereInput'][] | null; // [LabelWhereInput!]
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  LabelWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  LinkCreateManyWithoutLinksInput: { // input type
    connect?: NexusGenInputs['LinkWhereUniqueInput'][] | null; // [LinkWhereUniqueInput!]
    create?: NexusGenInputs['LinkCreateWithoutUserInput'][] | null; // [LinkCreateWithoutUserInput!]
  }
  LinkCreateOneWithoutLinkInput: { // input type
    connect?: NexusGenInputs['LinkWhereUniqueInput'] | null; // LinkWhereUniqueInput
    create?: NexusGenInputs['LinkCreateWithoutItemInput'] | null; // LinkCreateWithoutItemInput
  }
  LinkCreateWithoutItemInput: { // input type
    createdAt?: any | null; // DateTime
    description?: string | null; // String
    favicon?: string | null; // String
    href: string; // String!
    id?: string | null; // ID
    image?: string | null; // String
    notes: string; // String!
    title?: string | null; // String
    updatedAt?: any | null; // DateTime
    user: NexusGenInputs['UserCreateOneWithoutUserInput']; // UserCreateOneWithoutUserInput!
  }
  LinkCreateWithoutUserInput: { // input type
    createdAt?: any | null; // DateTime
    description?: string | null; // String
    favicon?: string | null; // String
    href: string; // String!
    id?: string | null; // ID
    image?: string | null; // String
    item: NexusGenInputs['ItemCreateOneWithoutItemInput']; // ItemCreateOneWithoutItemInput!
    notes: string; // String!
    title?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  LinkFilter: { // input type
    every?: NexusGenInputs['LinkWhereInput'] | null; // LinkWhereInput
    none?: NexusGenInputs['LinkWhereInput'] | null; // LinkWhereInput
    some?: NexusGenInputs['LinkWhereInput'] | null; // LinkWhereInput
  }
  LinkWhereInput: { // input type
    AND?: NexusGenInputs['LinkWhereInput'][] | null; // [LinkWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    description?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    favicon?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    href?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    image?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    item?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    NOT?: NexusGenInputs['LinkWhereInput'][] | null; // [LinkWhereInput!]
    notes?: NexusGenInputs['StringFilter'] | null; // StringFilter
    OR?: NexusGenInputs['LinkWhereInput'][] | null; // [LinkWhereInput!]
    title?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  LinkWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  NullableBooleanFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: boolean | null; // Boolean
  }
  NullableIntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: number | null; // Int
    notIn?: number[] | null; // [Int!]
  }
  NullableStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: string | null; // String
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  SignedURLArgs: { // input type
    key: string; // String!
    name: string; // String!
    type: string; // String!
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: string | null; // String
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  UploadGroupCreateManyWithoutUploadGroupsInput: { // input type
    connect?: NexusGenInputs['UploadGroupWhereUniqueInput'][] | null; // [UploadGroupWhereUniqueInput!]
    create?: NexusGenInputs['UploadGroupCreateWithoutUserInput'][] | null; // [UploadGroupCreateWithoutUserInput!]
  }
  UploadGroupCreateOneWithoutUploadGroupInput: { // input type
    connect?: NexusGenInputs['UploadGroupWhereUniqueInput'] | null; // UploadGroupWhereUniqueInput
    create?: NexusGenInputs['UploadGroupCreateWithoutFilesInput'] | null; // UploadGroupCreateWithoutFilesInput
  }
  UploadGroupCreateWithoutFilesInput: { // input type
    createdAt?: any | null; // DateTime
    id?: string | null; // ID
    isComplete?: boolean | null; // Boolean
    isFailed?: boolean | null; // Boolean
    updatedAt?: any | null; // DateTime
    user: NexusGenInputs['UserCreateOneWithoutUserInput']; // UserCreateOneWithoutUserInput!
  }
  UploadGroupCreateWithoutUserInput: { // input type
    createdAt?: any | null; // DateTime
    files?: NexusGenInputs['FileCreateManyWithoutFilesInput'] | null; // FileCreateManyWithoutFilesInput
    id?: string | null; // ID
    isComplete?: boolean | null; // Boolean
    isFailed?: boolean | null; // Boolean
    updatedAt?: any | null; // DateTime
  }
  UploadGroupFilter: { // input type
    every?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
    none?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
    some?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
  }
  UploadGroupOrderByInput: { // input type
    createdAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    isComplete?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    isFailed?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    updatedAt?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
  UploadGroupWhereInput: { // input type
    AND?: NexusGenInputs['UploadGroupWhereInput'][] | null; // [UploadGroupWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    files?: NexusGenInputs['FileFilter'] | null; // FileFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    isComplete?: NexusGenInputs['NullableBooleanFilter'] | null; // NullableBooleanFilter
    isFailed?: NexusGenInputs['NullableBooleanFilter'] | null; // NullableBooleanFilter
    NOT?: NexusGenInputs['UploadGroupWhereInput'][] | null; // [UploadGroupWhereInput!]
    OR?: NexusGenInputs['UploadGroupWhereInput'][] | null; // [UploadGroupWhereInput!]
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  UploadGroupWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  UserCreateInput: { // input type
    email: string; // String!
    files?: NexusGenInputs['FileCreateManyWithoutFilesInput'] | null; // FileCreateManyWithoutFilesInput
    firstName?: string | null; // String
    googleAccounts?: NexusGenInputs['GoogleAccountCreateManyWithoutGoogleAccountsInput'] | null; // GoogleAccountCreateManyWithoutGoogleAccountsInput
    id?: string | null; // ID
    items?: NexusGenInputs['ItemCreateManyWithoutItemsInput'] | null; // ItemCreateManyWithoutItemsInput
    labels?: NexusGenInputs['LabelCreateManyWithoutLabelsInput'] | null; // LabelCreateManyWithoutLabelsInput
    lastName?: string | null; // String
    links?: NexusGenInputs['LinkCreateManyWithoutLinksInput'] | null; // LinkCreateManyWithoutLinksInput
    uploadGroups?: NexusGenInputs['UploadGroupCreateManyWithoutUploadGroupsInput'] | null; // UploadGroupCreateManyWithoutUploadGroupsInput
  }
  UserCreateOneWithoutUserInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
    create?: NexusGenInputs['UserCreateWithoutFilesInput'] | null; // UserCreateWithoutFilesInput
  }
  UserCreateWithoutFilesInput: { // input type
    email: string; // String!
    firstName?: string | null; // String
    googleAccounts?: NexusGenInputs['GoogleAccountCreateManyWithoutGoogleAccountsInput'] | null; // GoogleAccountCreateManyWithoutGoogleAccountsInput
    id?: string | null; // ID
    items?: NexusGenInputs['ItemCreateManyWithoutItemsInput'] | null; // ItemCreateManyWithoutItemsInput
    labels?: NexusGenInputs['LabelCreateManyWithoutLabelsInput'] | null; // LabelCreateManyWithoutLabelsInput
    lastName?: string | null; // String
    links?: NexusGenInputs['LinkCreateManyWithoutLinksInput'] | null; // LinkCreateManyWithoutLinksInput
    uploadGroups?: NexusGenInputs['UploadGroupCreateManyWithoutUploadGroupsInput'] | null; // UploadGroupCreateManyWithoutUploadGroupsInput
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    files?: NexusGenInputs['FileFilter'] | null; // FileFilter
    firstName?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    googleAccounts?: NexusGenInputs['GoogleAccountFilter'] | null; // GoogleAccountFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    items?: NexusGenInputs['ItemFilter'] | null; // ItemFilter
    labels?: NexusGenInputs['LabelFilter'] | null; // LabelFilter
    lastName?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    links?: NexusGenInputs['LinkFilter'] | null; // LinkFilter
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    uploadGroups?: NexusGenInputs['UploadGroupFilter'] | null; // UploadGroupFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: string | null; // ID
  }
}

export interface NexusGenEnums {
  OrderByArg: "asc" | "desc"
}

export interface NexusGenRootTypes {
  File: { // root type
    createdAt: any; // DateTime!
    extension: string; // String!
    height?: number | null; // Int
    id: string; // ID!
    isUploaded?: boolean | null; // Boolean
    name: string; // String!
    size?: string | null; // String
    updatedAt: any; // DateTime!
    width?: number | null; // Int
  }
  InProgressUpload: { // root type
    signedUrls: string[]; // [String!]!
    uploadGroup?: NexusGenRootTypes['UploadGroup'] | null; // UploadGroup
  }
  Item: { // root type
    createdAt: any; // DateTime!
    id: string; // ID!
    type: string; // String!
    updatedAt: any; // DateTime!
  }
  JWT: { // root type
    token: string; // String!
  }
  Label: { // root type
    createdAt: any; // DateTime!
    id: string; // ID!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  Link: { // root type
    createdAt: any; // DateTime!
    description?: string | null; // String
    favicon?: string | null; // String
    href: string; // String!
    id: string; // ID!
    image?: string | null; // String
    notes: string; // String!
    title?: string | null; // String
    updatedAt: any; // DateTime!
  }
  Mutation: {};
  Query: {};
  UploadGroup: { // root type
    createdAt: any; // DateTime!
    id: string; // ID!
    isComplete?: boolean | null; // Boolean
    updatedAt: any; // DateTime!
  }
  User: { // root type
    email: string; // String!
    firstName?: string | null; // String
    id: string; // ID!
    lastName?: string | null; // String
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  Upload: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  DateTimeFilter: NexusGenInputs['DateTimeFilter'];
  FileCreateInput: NexusGenInputs['FileCreateInput'];
  FileCreateManyWithoutFilesInput: NexusGenInputs['FileCreateManyWithoutFilesInput'];
  FileCreateOneWithoutFileInput: NexusGenInputs['FileCreateOneWithoutFileInput'];
  FileCreateWithoutItemInput: NexusGenInputs['FileCreateWithoutItemInput'];
  FileCreateWithoutUploadGroupInput: NexusGenInputs['FileCreateWithoutUploadGroupInput'];
  FileFilter: NexusGenInputs['FileFilter'];
  FileOrderByInput: NexusGenInputs['FileOrderByInput'];
  FileWhereInput: NexusGenInputs['FileWhereInput'];
  FileWhereUniqueInput: NexusGenInputs['FileWhereUniqueInput'];
  GoogleAccountCreateManyWithoutGoogleAccountsInput: NexusGenInputs['GoogleAccountCreateManyWithoutGoogleAccountsInput'];
  GoogleAccountCreateWithoutUserInput: NexusGenInputs['GoogleAccountCreateWithoutUserInput'];
  GoogleAccountFilter: NexusGenInputs['GoogleAccountFilter'];
  GoogleAccountWhereInput: NexusGenInputs['GoogleAccountWhereInput'];
  GoogleAccountWhereUniqueInput: NexusGenInputs['GoogleAccountWhereUniqueInput'];
  ItemCreateManyWithoutItemsInput: NexusGenInputs['ItemCreateManyWithoutItemsInput'];
  ItemCreateOneWithoutItemInput: NexusGenInputs['ItemCreateOneWithoutItemInput'];
  ItemCreateWithoutLinkInput: NexusGenInputs['ItemCreateWithoutLinkInput'];
  ItemCreateWithoutUserInput: NexusGenInputs['ItemCreateWithoutUserInput'];
  ItemFilter: NexusGenInputs['ItemFilter'];
  ItemOrderByInput: NexusGenInputs['ItemOrderByInput'];
  ItemWhereInput: NexusGenInputs['ItemWhereInput'];
  ItemWhereUniqueInput: NexusGenInputs['ItemWhereUniqueInput'];
  KeyBlob: NexusGenInputs['KeyBlob'];
  LabelCreateManyWithoutLabelsInput: NexusGenInputs['LabelCreateManyWithoutLabelsInput'];
  LabelCreateWithoutUserInput: NexusGenInputs['LabelCreateWithoutUserInput'];
  LabelFilter: NexusGenInputs['LabelFilter'];
  LabelWhereInput: NexusGenInputs['LabelWhereInput'];
  LabelWhereUniqueInput: NexusGenInputs['LabelWhereUniqueInput'];
  LinkCreateManyWithoutLinksInput: NexusGenInputs['LinkCreateManyWithoutLinksInput'];
  LinkCreateOneWithoutLinkInput: NexusGenInputs['LinkCreateOneWithoutLinkInput'];
  LinkCreateWithoutItemInput: NexusGenInputs['LinkCreateWithoutItemInput'];
  LinkCreateWithoutUserInput: NexusGenInputs['LinkCreateWithoutUserInput'];
  LinkFilter: NexusGenInputs['LinkFilter'];
  LinkWhereInput: NexusGenInputs['LinkWhereInput'];
  LinkWhereUniqueInput: NexusGenInputs['LinkWhereUniqueInput'];
  NullableBooleanFilter: NexusGenInputs['NullableBooleanFilter'];
  NullableIntFilter: NexusGenInputs['NullableIntFilter'];
  NullableStringFilter: NexusGenInputs['NullableStringFilter'];
  SignedURLArgs: NexusGenInputs['SignedURLArgs'];
  StringFilter: NexusGenInputs['StringFilter'];
  UploadGroupCreateManyWithoutUploadGroupsInput: NexusGenInputs['UploadGroupCreateManyWithoutUploadGroupsInput'];
  UploadGroupCreateOneWithoutUploadGroupInput: NexusGenInputs['UploadGroupCreateOneWithoutUploadGroupInput'];
  UploadGroupCreateWithoutFilesInput: NexusGenInputs['UploadGroupCreateWithoutFilesInput'];
  UploadGroupCreateWithoutUserInput: NexusGenInputs['UploadGroupCreateWithoutUserInput'];
  UploadGroupFilter: NexusGenInputs['UploadGroupFilter'];
  UploadGroupOrderByInput: NexusGenInputs['UploadGroupOrderByInput'];
  UploadGroupWhereInput: NexusGenInputs['UploadGroupWhereInput'];
  UploadGroupWhereUniqueInput: NexusGenInputs['UploadGroupWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  UserCreateOneWithoutUserInput: NexusGenInputs['UserCreateOneWithoutUserInput'];
  UserCreateWithoutFilesInput: NexusGenInputs['UserCreateWithoutFilesInput'];
  UserWhereInput: NexusGenInputs['UserWhereInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  OrderByArg: NexusGenEnums['OrderByArg'];
}

export interface NexusGenFieldTypes {
  File: { // field return type
    createdAt: any; // DateTime!
    extension: string; // String!
    fullUrl: string; // String!
    height: number | null; // Int
    id: string; // ID!
    isUploaded: boolean | null; // Boolean
    name: string; // String!
    size: string | null; // String
    squareUrl: string; // String!
    updatedAt: any; // DateTime!
    uploadGroup: NexusGenRootTypes['UploadGroup']; // UploadGroup!
    width: number | null; // Int
  }
  InProgressUpload: { // field return type
    signedUrls: string[]; // [String!]!
    uploadGroup: NexusGenRootTypes['UploadGroup'] | null; // UploadGroup
  }
  Item: { // field return type
    createdAt: any; // DateTime!
    file: NexusGenRootTypes['File'] | null; // File
    id: string; // ID!
    labels: NexusGenRootTypes['Label'][]; // [Label!]!
    link: NexusGenRootTypes['Link'] | null; // Link
    type: string; // String!
    updatedAt: any; // DateTime!
  }
  JWT: { // field return type
    token: string; // String!
  }
  Label: { // field return type
    createdAt: any; // DateTime!
    id: string; // ID!
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    name: string; // String!
    updatedAt: any; // DateTime!
  }
  Link: { // field return type
    createdAt: any; // DateTime!
    description: string | null; // String
    favicon: string | null; // String
    href: string; // String!
    id: string; // ID!
    image: string | null; // String
    item: NexusGenRootTypes['Item']; // Item!
    notes: string; // String!
    title: string | null; // String
    updatedAt: any; // DateTime!
  }
  Mutation: { // field return type
    connectLabelToItem: NexusGenRootTypes['Item']; // Item!
    createLabel: NexusGenRootTypes['Label']; // Label!
    createLink: NexusGenRootTypes['Link']; // Link!
    createOneFile: NexusGenRootTypes['File']; // File!
    createOneUser: NexusGenRootTypes['User']; // User!
    deleteLabel: NexusGenRootTypes['User']; // User!
    deleteOneFile: NexusGenRootTypes['File'] | null; // File
    disconnectLabelFromItem: NexusGenRootTypes['Item']; // Item!
    generateSignedUrls: NexusGenRootTypes['InProgressUpload']; // InProgressUpload!
    googleSignIn: NexusGenRootTypes['JWT']; // JWT!
    processFiles: NexusGenRootTypes['File'][]; // [File!]!
  }
  Query: { // field return type
    _files: NexusGenRootTypes['File'][]; // [File!]!
    _items: NexusGenRootTypes['Item'][]; // [Item!]!
    _uploadgroups: NexusGenRootTypes['UploadGroup'][]; // [UploadGroup!]!
    file: NexusGenRootTypes['File'] | null; // File
    googleURL: string; // String!
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    me: NexusGenRootTypes['User'] | null; // User
    mostRecentItem: NexusGenRootTypes['Item'] | null; // Item
    test: string; // String!
    uploadGroups: NexusGenRootTypes['UploadGroup'][]; // [UploadGroup!]!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  UploadGroup: { // field return type
    createdAt: any; // DateTime!
    files: NexusGenRootTypes['File'][]; // [File!]!
    id: string; // ID!
    isComplete: boolean | null; // Boolean
    updatedAt: any; // DateTime!
  }
  User: { // field return type
    email: string; // String!
    files: NexusGenRootTypes['File'][]; // [File!]!
    firstName: string | null; // String
    fullName: string; // String!
    id: string; // ID!
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    labels: NexusGenRootTypes['Label'][]; // [Label!]!
    lastName: string | null; // String
  }
}

export interface NexusGenArgTypes {
  Item: {
    labels: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Label: {
    items: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Mutation: {
    connectLabelToItem: { // args
      itemId: string; // String!
      name: string; // String!
    }
    createLabel: { // args
      itemId?: string | null; // String
      name: string; // String!
    }
    createLink: { // args
      href: string; // String!
    }
    createOneFile: { // args
      data: NexusGenInputs['FileCreateInput']; // FileCreateInput!
    }
    createOneUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    deleteLabel: { // args
      labelId: string; // String!
    }
    deleteOneFile: { // args
      where: NexusGenInputs['FileWhereUniqueInput']; // FileWhereUniqueInput!
    }
    disconnectLabelFromItem: { // args
      itemId: string; // String!
      labelId: string; // String!
    }
    generateSignedUrls: { // args
      signedURLArgs?: NexusGenInputs['SignedURLArgs'][] | null; // [SignedURLArgs!]
    }
    googleSignIn: { // args
      code: string; // String!
    }
    processFiles: { // args
      uploadGroupId?: string | null; // String
    }
  }
  Query: {
    _files: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['FileOrderByInput'] | null; // FileOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
    }
    _items: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['ItemOrderByInput'] | null; // ItemOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    }
    _uploadgroups: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['UploadGroupOrderByInput'] | null; // UploadGroupOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
    }
    file: { // args
      where: NexusGenInputs['FileWhereUniqueInput']; // FileWhereUniqueInput!
    }
    items: { // args
      after?: string | null; // String
      before?: string | null; // String
      fileWhere?: NexusGenInputs['FileWhereInput'] | null; // FileWhereInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['ItemOrderByInput'] | null; // ItemOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['ItemWhereInput'] | null; // ItemWhereInput
    }
    mostRecentItem: { // args
      type?: string | null; // String
    }
    uploadGroups: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['UploadGroupOrderByInput'] | null; // UploadGroupOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['UploadGroupWhereInput'] | null; // UploadGroupWhereInput
    }
    users: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  UploadGroup: {
    files: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  User: {
    files: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    items: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    labels: { // args
      after?: string | null; // ID
      before?: string | null; // ID
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "File" | "InProgressUpload" | "Item" | "JWT" | "Label" | "Link" | "Mutation" | "Query" | "UploadGroup" | "User";

export type NexusGenInputNames = "DateTimeFilter" | "FileCreateInput" | "FileCreateManyWithoutFilesInput" | "FileCreateOneWithoutFileInput" | "FileCreateWithoutItemInput" | "FileCreateWithoutUploadGroupInput" | "FileFilter" | "FileOrderByInput" | "FileWhereInput" | "FileWhereUniqueInput" | "GoogleAccountCreateManyWithoutGoogleAccountsInput" | "GoogleAccountCreateWithoutUserInput" | "GoogleAccountFilter" | "GoogleAccountWhereInput" | "GoogleAccountWhereUniqueInput" | "ItemCreateManyWithoutItemsInput" | "ItemCreateOneWithoutItemInput" | "ItemCreateWithoutLinkInput" | "ItemCreateWithoutUserInput" | "ItemFilter" | "ItemOrderByInput" | "ItemWhereInput" | "ItemWhereUniqueInput" | "KeyBlob" | "LabelCreateManyWithoutLabelsInput" | "LabelCreateWithoutUserInput" | "LabelFilter" | "LabelWhereInput" | "LabelWhereUniqueInput" | "LinkCreateManyWithoutLinksInput" | "LinkCreateOneWithoutLinkInput" | "LinkCreateWithoutItemInput" | "LinkCreateWithoutUserInput" | "LinkFilter" | "LinkWhereInput" | "LinkWhereUniqueInput" | "NullableBooleanFilter" | "NullableIntFilter" | "NullableStringFilter" | "SignedURLArgs" | "StringFilter" | "UploadGroupCreateManyWithoutUploadGroupsInput" | "UploadGroupCreateOneWithoutUploadGroupInput" | "UploadGroupCreateWithoutFilesInput" | "UploadGroupCreateWithoutUserInput" | "UploadGroupFilter" | "UploadGroupOrderByInput" | "UploadGroupWhereInput" | "UploadGroupWhereUniqueInput" | "UserCreateInput" | "UserCreateOneWithoutUserInput" | "UserCreateWithoutFilesInput" | "UserWhereInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = "OrderByArg";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String" | "Upload";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}