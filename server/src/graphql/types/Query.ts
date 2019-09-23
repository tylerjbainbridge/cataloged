import { objectType, arg } from 'nexus';

import { knex } from '../../data/knex';
import {
  paginationArgs,
  getFindManyWhereArgs,
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

    t.list.string('s3PutUrls', {
      args: {
        signedURLArgs: arg({ type: 'SignedURLArgs', list: true }),
      },
      resolve: (root, args) => {
        return Promise.all(
          args.signedURLArgs.map(
            ({ key, type }: { key: string; type: string }) =>
              s3.getSignedUrl('putObject', {
                Key: key,
                ContentType: type,
                Bucket: process.env.AWS_S3_BUCKET,
                Expires: 60 * 5, // 5 minutes
              }),
          ),
        );
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
        where: getFindManyWhereArgs('Item'),
        // @ts-ignore
        fileWhere: getFindManyWhereArgs('File'),
        // @ts-ignore
        orderBy: getFindManyOrderArgs('Item'),
      },
      resolve: (_, args, ctx) => {
        const { fileWhere, ...rest } = args;

        return ctx.photon.items.findMany({
          where: {
            // @ts-ignore
            user: { id: ctx.user.id },
            ...conditionallyAddKey(fileWhere, 'file'),
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
        where: getFindManyWhereArgs('UploadGroup'),
        // @ts-ignore
        orderBy: getFindManyOrderArgs('UploadGroup'),
      },
      resolve: (_, args, ctx) => {
        const { fileWhere, ...rest } = args;

        return ctx.photon.uploadGroups.findMany({
          where: {
            // @ts-ignore
            user: { id: ctx.user.id },
            ...(rest.where || {}),
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

    t.crud.uploadgroups({
      alias: '_uploadgroups',
      filtering: true,
      ordering: true,
    });

    t.crud.file();

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
