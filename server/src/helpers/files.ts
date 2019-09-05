import { File, User } from '@generated/photon';

export enum KEY_TYPES {
  full = 'full',
  square = 'square',
  original = 'original',
}

export const getS3Key = (user: User, file: File, type?: KEY_TYPES) =>
  `users/${user.id}/${file.id}/${type || KEY_TYPES.full}.${file.extension}`;

export const getCloudFrontURL = (user: User, file: File, type?: KEY_TYPES) =>
  `http://collections-file-storage.s3-us-west-2.amazonaws.com/${getS3Key(
    user,
    file,
    type,
  )}`;
