import { rule, shield, allow } from 'graphql-shield';

const requireAuth = rule()((parent, args, ctx) => ctx.user !== null);

export const permissions = shield(
  {
    Query: {
      '*': requireAuth,
      test: allow,
      googleURL: allow,
    },
    // Mutation: {
    //   '*': allow,
    //   googleSignIn: allow,
    // },
  },
  // {
  //   fallbackError: `You're not authorized to view this.`,
  //   fallbackRule: requireAuth,
  // },
);
