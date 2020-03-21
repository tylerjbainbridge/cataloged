import { objectType } from 'nexus';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.href();
    t.model.notes();

    t.model.image();
    t.model.favicon();
    t.model.logo();
    t.model.title();
    t.model.description();
    t.model.host();
    t.model.isIframeDisabled();

    t.model.item();
  },
});
