/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAuthUser
// ====================================================

export interface getAuthUser_me_googleAccounts {
  __typename: "GoogleAccount";
  id: string;
  email: string | null;
}

export interface getAuthUser_me_inviteCode {
  __typename: "InviteCode";
  code: string;
}

export interface getAuthUser_me_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface getAuthUser_me_collections {
  __typename: "Collection";
  id: string;
  name: string;
  description: string | null;
}

export interface getAuthUser_me {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  role: string;
  googleAccounts: getAuthUser_me_googleAccounts[];
  inviteCode: getAuthUser_me_inviteCode | null;
  labels: getAuthUser_me_labels[];
  collections: getAuthUser_me_collections[];
}

export interface getAuthUser {
  me: getAuthUser_me | null;
}
