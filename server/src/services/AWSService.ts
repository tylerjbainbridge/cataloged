import AWS = require('aws-sdk');
// import zlib = require('zlib');
import { ReadStream } from 'fs';
import { File, User } from '@generated/photon';

import { getS3Key, KEY_TYPES } from '../helpers/files';
import { ImageService } from './ImageService';

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export class AWSService {
  static upload = (
    stream: ReadStream | any,
    user: User,
    file: File,
    type?: KEY_TYPES,
  ) =>
    new Promise((resolve, reject) => {
      const body = stream;
      // eventually gzip the original and gen thumbnails .pipe(zlib.createGzip());

      const key = getS3Key(user, file, type);

      s3.upload({
        Body: body,
        Bucket: process.env.AWS_S3_BUCKET,
        ACL: 'public-read',
        Key: key,
      })
        // .on('httpUploadProgress', ({ loaded, total }) => {
        //   // console.log(`uploaded: ${loaded}/${total}`);
        // })
        .send((err: any, data: any) => (err ? reject(err) : resolve(data)));
    });

  static uploadImage = async (stream: ReadStream, user: User, file: File) => {
    const { full, square, original } = await ImageService.processImages(stream);

    await Promise.all([
      AWSService.upload(full, user, file, KEY_TYPES.full),
      AWSService.upload(square, user, file, KEY_TYPES.square),
    ]);

    // no need to wait
    (async () =>
      await AWSService.upload(original, user, file, KEY_TYPES.original))();
  };
}
