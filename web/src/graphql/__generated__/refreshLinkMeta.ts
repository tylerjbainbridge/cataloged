/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: refreshLinkMeta
// ====================================================

export interface refreshLinkMeta_refreshLinkMeta {
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

export interface refreshLinkMeta {
  refreshLinkMeta: refreshLinkMeta_refreshLinkMeta;
}

export interface refreshLinkMetaVariables {
  linkId: string;
  href: string;
}
