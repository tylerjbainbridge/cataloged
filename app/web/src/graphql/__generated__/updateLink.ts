/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLink
// ====================================================

export interface updateLink_updateLink {
  __typename: "Link";
  id: string;
  href: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
  image: string | null;
  favicon: string | null;
  logo: string | null;
  title: string | null;
  description: string | null;
  host: string | null;
  isIframeDisabled: boolean;
}

export interface updateLink {
  updateLink: updateLink_updateLink;
}

export interface updateLinkVariables {
  linkId: string;
  href: string;
  title: string;
  description?: string | null;
}
