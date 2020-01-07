/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAuthUser
// ====================================================

export interface getAuthUser_me_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface getAuthUser_me {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
  labels: getAuthUser_me_labels[];
}

export interface getAuthUser {
  me: getAuthUser_me | null;
}
