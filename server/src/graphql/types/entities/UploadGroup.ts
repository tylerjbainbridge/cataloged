import { objectType } from 'nexus';

export const UploadGroup = objectType({
  name: 'UploadGroup',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.isComplete();

    t.model.files({ pagination: true });
  },
});
