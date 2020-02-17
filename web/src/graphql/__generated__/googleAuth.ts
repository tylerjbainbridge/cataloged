/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: googleAuth
// ====================================================

export interface googleAuth_googleAuth {
  __typename: "JWT";
  token: string;
}

export interface googleAuth {
  googleAuth: googleAuth_googleAuth;
}

export interface googleAuthVariables {
  code: string;
}
