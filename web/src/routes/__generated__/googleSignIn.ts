/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: googleSignIn
// ====================================================

export interface googleSignIn_googleSignIn {
  __typename: "JWT";
  token: string;
}

export interface googleSignIn {
  googleSignIn: googleSignIn_googleSignIn;
}

export interface googleSignInVariables {
  code: string;
}
