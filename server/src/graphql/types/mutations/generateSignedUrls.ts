import { extendType, arg } from 'nexus';
import { s3 } from '../../../services/AWSService';
import { KEY_TYPES, getS3Key } from '../../../helpers/files';

export const generateSignedUrls = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('generateSignedUrls', {
      type: 'InProgressUpload',
      args: {
        signedURLArgs: arg({ type: 'SignedURLArgs', list: true }),
      },
      resolve: async (root, args, ctx) => {
        if (!ctx.user) throw new Error('Whoops, not authorized');

        const uploadGroup = await ctx.prisma.uploadGroup.create({
          data: { isComplete: false, user: { connect: { id: ctx.user.id } } },
        });

        const signedUrls = Promise.all(
          args.signedURLArgs.map(
            async ({ name: rawFileName, type, size }: any) => {
              const split = rawFileName.split('.');
              const extension = split.pop();
              const name = split.join('.');

              const file = await ctx.prisma.file.create({
                data: {
                  name,
                  size,
                  contentType: type,
                  extension,
                  user: { connect: { id: ctx.user.id } },
                  isUploaded: false,
                  hasStartedUploading: false,
                  item: {
                    create: {
                      type: 'file',
                      user: { connect: { id: ctx.user.id } },
                    },
                  },
                  uploadGroup: {
                    connect: { id: uploadGroup.id },
                  },
                },
              });

              return await s3.getSignedUrl('putObject', {
                Key: getS3Key(ctx.user, file, KEY_TYPES.original),
                ContentType: type,
                Bucket: process.env.AWS_S3_BUCKET,
                Expires: 60 * 5, // 5 minutes
              });
            },
          ),
        );

        return {
          uploadGroup,
          signedUrls,
        };
      },
    });
  },
});
