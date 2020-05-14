import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { File } from '@prisma/client';

export const taskFixFileDates = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('taskFixFileDates', {
      type: 'String',
      resolve: async (root, args, ctx) => {
        const files = await ctx.prisma.file.findMany();

        await Bluebird.map(
          files,
          async (file: File) =>
            await ctx.prisma.file.update({
              where: { id: file.id },
              data: { date: file.createdAt },
            }),
          { concurrency: 50 },
        );

        return `Updated ${files.length} files`;
      },
    });
  },
});
