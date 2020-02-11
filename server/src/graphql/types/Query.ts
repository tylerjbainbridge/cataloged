import { objectType, arg, stringArg } from 'nexus';
import { merge, set } from 'lodash';

import { knex } from '../../data/knex';
import {
  paginationArgs,
  getWhereArgs,
  getFindManyOrderArgs,
  conditionallyAddKey,
} from './helpers';
import { s3 } from '../../services/AWSService';
import { feedResolver, feedArgs } from '../resolvers/feed';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.string('test', {
      resolve: () => {
        return 'hello world!!!';
      },
    });

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (root, args, ctx) => ctx.user,
    });

    t.string('googleURL', {
      resolve: (root, args, ctx) => ctx.google.getUrl(),
    });

    t.crud.users();

    t.field('item', {
      type: 'Item',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const [item] = await ctx.prisma.item.findMany({
          where: {
            id: args.id,
            user: { id: ctx.user.id },
          },
          first: 1,
          orderBy: { createdAt: 'desc' },
        });

        return item;
      },
    });

    t.field('itemsConnection', {
      type: 'ItemConnection',
      args: feedArgs,
      nullable: false,
      resolve: feedResolver,
    });

    t.list.field('savedSearches', {
      type: 'SavedSearch',
      resolve: (_, args, ctx) => {
        return ctx.prisma.savedSearch.findMany({
          where: {
            user: { id: ctx.user.id },
          },
        });
      },
    });

    t.list.field('uploadGroups', {
      type: 'UploadGroup',
      args: {
        ...paginationArgs,
        // @ts-ignore
        where: getWhereArgs('UploadGroup'),
        // @ts-ignore
        orderBy: getFindManyOrderArgs('UploadGroup'),
      },
      resolve: (_, args, ctx) => {
        const { where, ...rest } = args;

        return ctx.prisma.uploadGroup.findMany({
          where: {
            // @ts-ignore
            ...(where || {}),
            isComplete: false,
            user: { id: ctx.user.id },
          },
          ...rest,
        });
      },
    });

    t.crud.users({
      alias: '_users',
      filtering: true,
      ordering: true,
    });

    t.crud.inviteCodes({
      alias: '_inviteCodes',
      filtering: true,
      ordering: true,
    });

    t.crud.items({
      alias: '_items',
      filtering: true,
      ordering: true,
    });

    t.crud.files({
      alias: '_files',
      filtering: true,
      ordering: true,
    });

    t.crud.uploadGroups({
      alias: '_uploadgroups',
      filtering: true,
      ordering: true,
    });

    t.crud.file();

    if (process.env.NODE_ENV === 'development') {
      t.field('mostRecentItem', {
        type: 'Item',
        nullable: true,
        args: {
          type: stringArg(),
        },
        resolve: async (root, args, ctx) => {
          const [first] = await ctx.prisma.item.findMany({
            first: 1,
            where: { type: args.type || 'link', user: { id: ctx.user.id } },
          });

          return first;
        },
      });
    }

    // t.list.field('feed', {
    //   type: 'File',
    //   args: { search: stringArg() },
    //   resolve: (_, args, ctx) => {
    //     return knex('File').where({ name: args.search });
    //   },
    // });

    // t.list.field('filterFiles', {
    //   type: 'File',
    //   args: {
    //     searchString: stringArg({ nullable: true })
    //   },
    //   resolve: (_, { searchString }, ctx) => {
    //     return ctx.prisma.file.findMany({
    //       where: {
    //         OR: [
    //           { title: { contains: searchString } },
    //           { content: { contains: searchString } }
    //         ]
    //       }
    //     });
    //   }
    // });
  },
});
