import Bluebird = require('bluebird');
import { extendType, inputObjectType, stringArg } from 'nexus';

import { AWSService, s3 } from '../../../services/AWSService';
import { getS3Key, KEY_TYPES } from '../../../helpers/files';
import { File } from '@prisma/client';
import { ProcessFile } from '../../../queues/ProcessFile';

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

        if (!args.uploadGroupId) {
          throw new Error('must supply keys.');
        }

        const upload = await ctx.prisma.uploadGroup.findOne({
          where: { id: args.uploadGroupId },
          include: { files: true },
        });

        const keyFiles = await Bluebird.map(
          upload.files,
          async (file: File) => {
            await ProcessFile.add({ file, user: ctx.user });
          },
        );

        await ctx.prisma.uploadGroup.update({
          where: { id: upload.id },
          data: {
            isComplete: true,
          },
        });

        const allFiles = [...keyFiles];

        return allFiles.filter(Boolean);
      },
    });
  },
});
