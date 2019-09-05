import Bluebird = require('bluebird');
import { extendType, arg } from '@prisma/nexus';

import { File } from '../types/entities/File';

import { AWSService } from '../../services/AWSService';

export const createFiles = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('createFiles', {
      type: File,
      args: {
        files: arg({ type: 'Upload', required: true, list: true }),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const blobs = await Promise.all(args.files.map((file: any) => file));
        console.log('blobs.length', blobs.length);

        const upload = await ctx.photon.uploadGroups.create({
          data: { isComplete: false, user: { connect: { id: ctx.user.id } } },
        });

        const files = await Bluebird.map(
          blobs,
          async (blob: any) => {
            const { filename, createReadStream } = await blob;
            const stream = createReadStream();

            const [name, ...extension] = filename.split('.');

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
          },
          { concurrency: 1 },
        );

        console.log('files.length', files.length);

        return files;
      },
    });
  },
});
