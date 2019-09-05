import { mutationType } from '@prisma/nexus';

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneFile();
    t.crud.createOneFile();
  },
});
