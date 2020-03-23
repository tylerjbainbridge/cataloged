import { extendType, stringArg } from 'nexus';
import _ from 'lodash';
import Bluebird from 'bluebird';
// import { Link } from '@prisma/client';

export const testSendEmail = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('testSendEmail', {
      type: 'String',
      resolve: async (root, args, ctx) => {
        return '';
      },
    });
  },
});
