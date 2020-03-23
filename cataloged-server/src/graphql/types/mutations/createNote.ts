import { extendType, stringArg } from 'nexus';
import _ from 'lodash';

import { connectTo } from '../../../helpers/prisma';

import { Note } from '../entities/Note';

export const createNote = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createNote', {
      type: Note,
      args: {
        raw: stringArg({ required: true }),
        text: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.note.create({
          data: {
            ...args,
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
            item: {
              create: { type: 'note', user: { connect: { id: ctx.user.id } } },
            },
          },
        });
      },
    });
  },
});
