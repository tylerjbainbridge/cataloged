import { objectType } from 'nexus';

export const GoogleContact = objectType({
  name: 'GoogleContact',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.resourceName();
    t.model.name();
    t.model.email();
    t.model.otherEmails();
    t.model.phoneNumber();
    t.model.otherPhoneNumbers();
    t.model.companyTitle();
    t.model.companyName();
    t.model.photoUrl();

    t.model.item();
    t.model.googleAccount();
  },
});
