import { rule, shield, and } from 'graphql-shield';
import _ from 'lodash';

const requireAuth = rule({ cache: 'no_cache' })((parent, args, ctx, info) => {
  console.log('ctx.user', ctx.user);

  if (ctx.user === null) {
    // if (process.env.NODE_ENV === 'development') console.log(info);
    throw new Error('Uh oh!');
  }

  return true;
});

const allow = rule({ cache: 'no_cache' })(() => true);

const noPrivateFields = rule({ cache: 'no_cache' })(
  (parent, args, ctx, info) => {
    if (_.get(info, 'fieldName', '').startsWith('_')) {
      throw new Error('Private!');
    }

    return true;
  },
);

export const permissions = shield(
  {
    Query: {
      '*': and(requireAuth, noPrivateFields),
      test: allow,
      googleURL: allow,
    },
    Mutation: {
      '*': and(requireAuth, noPrivateFields),
      googleSignIn: allow,
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
    fallbackRule: allow,
  },
);
