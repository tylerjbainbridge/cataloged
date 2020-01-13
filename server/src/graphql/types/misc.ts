import { inputObjectType, objectType } from 'nexus';

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('startCursor', {
      nullable: true,
    });
    t.string('endCursor', {
      nullable: true,
    });
    t.boolean('hasPreviousPage');
    t.boolean('hasNextPage');
  },
});

export const SignedURLArgs = inputObjectType({
  name: 'SignedURLArgs',
  definition(t) {
    t.string('name', { required: true });
    t.string('key', { required: true });
    t.string('type', { required: true });
  },
});

export const InProgressUpload = objectType({
  name: 'InProgressUpload',
  definition(t) {
    t.list.string('signedUrls');

    t.field('uploadGroup', {
      type: 'UploadGroup',
      nullable: true,
    });
  },
});
