import { objectType, arg, stringArg } from 'nexus';
import { merge } from 'lodash';

import { knex } from '../../data/knex';
import {
  paginationArgs,
  getWhereArgs,
  getFindManyOrderArgs,
  conditionallyAddKey,
} from './helpers';
import { s3 } from '../../services/AWSService';

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

    t.list.field('items', {
      type: 'Item',
      args: {
        ...paginationArgs,
        // @ts-ignore
        where: getWhereArgs('Item'),
        // @ts-ignore
        fileWhere: getWhereArgs('File'),
        // @ts-ignore
        orderBy: getFindManyOrderArgs('Item'),
      },
      resolve: (_, args, ctx) => {
        const { fileWhere, ...rest } = args;

        console.log({
          where: {
            // @ts-ignore
            user: { id: ctx.user.id },
            ...conditionallyAddKey(
              merge(fileWhere, { isUploaded: true }),
              'file',
            ),
            ...(rest.where || {}),
          },
          ...rest,
        });

        return ctx.photon.items.findMany({
          where: {
            // @ts-ignore
            user: { id: ctx.user.id },
            ...conditionallyAddKey(
              merge(fileWhere, { isUploaded: true }),
              'file',
            ),
            ...(rest.where || {}),
          },
          ...rest,
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

        return ctx.photon.uploadGroups.findMany({
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
          const [first] = await ctx.photon.items.findMany({
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
    //     return ctx.photon.files.findMany({
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
