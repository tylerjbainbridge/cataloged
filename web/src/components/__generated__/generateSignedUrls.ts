/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SignedURLArgs } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: generateSignedUrls
// ====================================================

export interface generateSignedUrls_generateSignedUrls_uploadGroup {
  __typename: "UploadGroup";
  id: string;
}

export interface generateSignedUrls_generateSignedUrls {
  __typename: "InProgressUpload";
  signedUrls: string[];
  uploadGroup: generateSignedUrls_generateSignedUrls_uploadGroup | null;
}

export interface generateSignedUrls {
  generateSignedUrls: generateSignedUrls_generateSignedUrls;
}

export interface generateSignedUrlsVariables {
  signedURLArgs?: SignedURLArgs[] | null;
}
