import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { connectTo } from '../../../helpers/prisma';

import { Note } from '../entities/Note';

export const updateNote = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateNote', {
      type: Note,
      args: {
        noteId: stringArg({ required: true }),
        raw: stringArg({ required: true }),
        text: stringArg({ required: true }),
        title: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const { noteId, ...rest } = args;

        await ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: {
            notes: {
              update: {
                where: {
                  id: noteId,
                },
                data: rest,
              },
            },
          },
        });

        return await ctx.prisma.note.findOne({
          where: { id: noteId },
        });
      },
    });
  },
});
