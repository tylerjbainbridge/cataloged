/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: enterInviteCode
// ====================================================

export interface enterInviteCode_enterInviteCode_inviteCode {
  __typename: "InviteCode";
  id: string;
  code: string;
}

export interface enterInviteCode_enterInviteCode {
  __typename: "User";
  id: string;
  inviteCode: enterInviteCode_enterInviteCode_inviteCode | null;
}

export interface enterInviteCode {
  enterInviteCode: enterInviteCode_enterInviteCode;
}

export interface enterInviteCodeVariables {
  code: string;
}
