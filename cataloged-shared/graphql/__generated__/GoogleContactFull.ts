/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GoogleContactFull
// ====================================================

export interface GoogleContactFull {
  __typename: "GoogleContact";
  id: string;
  resourceName: string;
  photoUrl: string | null;
  name: string | null;
  email: string | null;
  otherEmails: string[];
  phoneNumber: string | null;
  otherPhoneNumbers: string[];
  companyTitle: string | null;
  companyName: string | null;
}
