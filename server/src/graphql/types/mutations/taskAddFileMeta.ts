import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { File } from '@prisma/client';

import filesize from 'filesize';
import fileType from 'file-type';
import { getS3Key, KEY_TYPES } from '../../../helpers/files';
import { s3 } from '../../../services/AWSService';
import { getBufferFromStream } from '../../../services/ImageService';

export const taskAddFileMeta = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('taskAddFileMeta', {
      type: 'String',
      resolve: async (root, args, ctx) => {
        const files = await ctx.prisma.file.findMany();

        await Bluebird.map(
          files,
          async (file: File) => {
            try {
              const stream = s3
                .getObject({
                  Key: `production/users/${ctx.user.id}/${file.id}/${KEY_TYPES.original}.${file.extension}`,
                  Bucket: process.env.AWS_S3_BUCKET,
                })
                .createReadStream();

              const buffer = await getBufferFromStream(stream);

              const { mime } = await fileType.fromBuffer(buffer);

              console.log({
                bytes: buffer.byteLength,
                mime,
              });

              return await ctx.prisma.file.update({
                where: { id: file.id },
                data: {
                  size: buffer.byteLength,
                  contentType: mime,
                },
              });
            } catch (e) {
              console.log('failed for file', file);
              console.log(e);
            }
          },
          { concurrency: 20 },
        );

        return `Updated ${files.length} files`;
      },
    });
  },
});
