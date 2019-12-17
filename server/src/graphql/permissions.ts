import { rule, shield, and } from 'graphql-shield';
import _ from 'lodash';

const getFieldName = (info: any) => _.get(info, 'fieldName', '');

const requireAuth = rule({ cache: 'no_cache' })((parent, args, ctx, info) => {
  console.log('ctx.user', ctx.user);

  if (ctx.user === null) {
    if (process.env.NODE_ENV === 'development') console.log(getFieldName(info));
    throw new Error('Uh oh!');
  }

  return true;
});

const allow = rule({ cache: 'no_cache' })(() => true);

const noPrivateFields = rule({ cache: 'no_cache' })(
  (parent, args, ctx, info) => {
    if (getFieldName(info).startsWith('_')) {
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
