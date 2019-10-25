import Bluebird = require('bluebird');
import { extendType, inputObjectType, stringArg } from 'nexus';

import { AWSService, s3 } from '../../services/AWSService';
import { getS3Key, KEY_TYPES } from '../../helpers/files';
import { File } from '@generated/photon';

const MAX_CONCURRENCY = 5;

export const KeyBlob = inputObjectType({
  name: 'KeyBlob',
  definition(t) {
    t.string('fileId', { required: true });
  },
});

export const processFiles = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('processFiles', {
      type: 'File',
      args: {
        // files: arg({ type: 'Upload', list: true }),
        uploadGroupId: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        console.log(args.uploadGroupId);

        if (!args.uploadGroupId) {
          throw new Error('must supply keys.');
        }

        const upload = await ctx.photon.uploadGroups.findOne({
          where: { id: args.uploadGroupId },
          include: { files: true },
        });

        const keyFiles = await Bluebird.map(
          upload.files,
          async ({ id }: File) => {
            try {
              const file = await ctx.photon.files.findOne({
                where: { id },
              });

              const stream = s3
                .getObject({
                  Key: getS3Key(ctx.user, file, KEY_TYPES.original),
                  Bucket: process.env.AWS_S3_BUCKET,
                })
                .createReadStream();

              await AWSService.uploadImage(stream, ctx.user, file);

              await ctx.photon.files.update({
                where: { id: file.id },
                data: {
                  isUploaded: true,
                },
              });

              return file;
            } catch (e) {
              await ctx.photon.files.update({
                where: { id: file.id },
                data: {
                  isFailed: true,
                },
              });

              return null;
            }
          },
          { concurrency: MAX_CONCURRENCY },
        );

        await ctx.photon.uploadGroups.update({
          where: { id: upload.id },
          data: {
            isComplete: true,
          },
        });

        const allFiles = [...keyFiles];
        console.log('allFiles.length', allFiles.length);

        return allFiles;
      },
    });
  },
});
