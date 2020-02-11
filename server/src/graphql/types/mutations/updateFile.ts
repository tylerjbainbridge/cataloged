import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { File } from '../entities/File';

export const updateFile = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateFile', {
      type: File,
      args: {
        fileId: stringArg({ required: true }),
        description: stringArg(),
        title: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const { fileId, ...newData } = args;

        console.log(newData, args);

        await ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: {
            files: {
              update: {
                where: {
                  id: fileId,
                },
                data: newData,
              },
            },
          },
        });

        return await ctx.prisma.file.findOne({
          where: { id: fileId },
        });
      },
    });
  },
});
