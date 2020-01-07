/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createLabel
// ====================================================

export interface createLabel_createLabel_labels {
  __typename: "Label";
  id: string;
  name: string;
}

export interface createLabel_createLabel {
  __typename: "User";
  id: string;
  labels: createLabel_createLabel_labels[];
}

export interface createLabel {
  createLabel: createLabel_createLabel;
}

export interface createLabelVariables {
  name: string;
}
