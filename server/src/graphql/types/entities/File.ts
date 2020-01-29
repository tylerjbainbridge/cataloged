import { objectType } from 'nexus';
import { getCloudFrontURL, KEY_TYPES } from '../../../helpers/files';

export const File = objectType({
  name: 'File',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.name();
    t.model.extension();
    t.model.isUploaded();
    t.model.size();
    t.model.width();
    t.model.height();

    t.model.description();
    t.model.title();

    t.string('originalName', {
      resolve: (file, args, ctx) =>
        `${file.name}.${(file.extension || '').toLowerCase()}`,
    });

    t.model.uploadGroup();

    t.model.item();

    t.string('fullUrl', {
      resolve: (file, args, ctx) => getCloudFrontURL(ctx.user, file),
    });

    t.string('squareUrl', {
      resolve: (file, args, ctx) =>
        getCloudFrontURL(ctx.user, file, KEY_TYPES.square),
    });
  },
});
