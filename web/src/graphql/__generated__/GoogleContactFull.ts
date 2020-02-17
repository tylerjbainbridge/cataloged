/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GoogleContactFull
// ====================================================

export interface GoogleContactFull_item_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface GoogleContactFull_item {
  __typename: "Item";
  id: string;
  type: string;
  date: any;
  createdAt: any;
  updatedAt: any;
  labels: GoogleContactFull_item_labels[];
}

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
  item: GoogleContactFull_item;
}
