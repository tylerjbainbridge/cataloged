/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAuthUser
// ====================================================

export interface getAuthUser_me {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
}

export interface getAuthUser {
  me: getAuthUser_me | null;
}
