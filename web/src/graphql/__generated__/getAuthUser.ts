/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAuthUser
// ====================================================

export interface getAuthUser_me_inviteCode {
  __typename: "InviteCode";
  code: string;
}

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
  isActive: boolean;
  inviteCode: getAuthUser_me_inviteCode | null;
  labels: getAuthUser_me_labels[];
}

export interface getAuthUser {
  me: getAuthUser_me | null;
}
