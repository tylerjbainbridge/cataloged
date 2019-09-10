import Bluebird = require('bluebird');
import { extendType, inputObjectType, arg } from '@prisma/nexus';

import { File } from '../types/entities/File';

import { AWSService, s3 } from '../../services/AWSService';

export const KeyBlob = inputObjectType({
  name: 'KeyBlob',
  definition(t) {
    t.string('tempKey', { required: true });
    t.string('originalFilename', { required: true });
  },
});

export const createFiles = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('createFiles', {
      type: File,
      args: {
        files: arg({ type: 'Upload', list: true }),
        keyBlobs: arg({ type: 'KeyBlob', list: true }),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        if (!args.files && !args.keyBlobs) {
          throw new Error('must supply at least files or keys.');
        }

        const blobs = await Promise.all(args.files || []);

        const upload = await ctx.photon.uploadGroups.create({
          data: { isComplete: false, user: { connect: { id: ctx.user.id } } },
        });

        const processFile = async ({
          stream,
          name,
          extension,
        }: {
          stream: any;
          name: any;
          extension: any;
        }) => {
          const file = await ctx.photon.files.create({
            data: {
              name,
              extension: extension.join(),
              user: { connect: { id: ctx.user.id } },
              isUploaded: false,
              item: {
                create: {
                  type: 'file',
                  user: { connect: { id: ctx.user.id } },
                },
              },
              uploadGroup: {
                connect: { id: upload.id },
              },
            },
          });

          (async () => {
            await AWSService.uploadImage(stream, ctx.user, file);

            console.log(`uploaded ${file.id}`);

            await ctx.photon.files.update({
              where: { id: file.id },
              data: {
                isUploaded: true,
              },
            });
            await ctx.photon.uploadGroups.update({
              where: { id: upload.id },
              data: {
                isComplete: true,
              },
            });
          })();

          return file;
        };

        const blobFiles = await Bluebird.map(
          blobs || [],
          async (blob: any) => {
            const { filename, createReadStream } = await blob;
            const stream = createReadStream();

            const [name, ...extension] = filename.split('.');

            return processFile({ name, extension, stream });
          },
          { concurrency: 1 },
        );

        const testFiles = await Bluebird.map(
          args.keyBlobs || [],
          async (blob: any) => {
            const { tempKey: key, originalFilename } = await blob;

            const [name, ...extension] = originalFilename.split('.');

            const stream = s3
              .getObject({
                Key: key,
                Bucket: process.env.AWS_S3_BUCKET,
              })
              .createReadStream();

            const file = await processFile({ name, extension, stream });

            s3.deleteObject({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: key,
            }).promise();

            return file;
          },
          { concurrency: 1 },
        );

        const allFiles = [...blobFiles, ...testFiles];
        console.log('allFiles.length', allFiles.length);

        return allFiles;
      },
    });
  },
});
