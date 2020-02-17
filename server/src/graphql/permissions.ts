import { rule, shield, and } from 'graphql-shield';
import _ from 'lodash';

const getFieldName = (info: any) => _.get(info, 'fieldName', '');

const requireAuth = rule({ cache: 'no_cache' })((parent, args, ctx, info) => {
  if (ctx.user === null) {
    if (process.env.NODE_ENV === 'development') console.log(getFieldName(info));
    throw new Error('Unauthenticated user!');
  }

  return true;
});

const admin = rule({ cache: 'no_cache' })((parent, args, ctx, info) => {
  if (ctx.user === null || ctx.user.role !== 'admin') {
    throw new Error('Insufficient permissions!');
  }

  return true;
});

const allow = rule({ cache: 'no_cache' })(() => true);

const bannedPatterns = ['_', 'task'];

const noPrivateFields = rule({ cache: 'no_cache' })(
  (parent, args, ctx, info) => {
    if (
      // @ts-ignore
      bannedPatterns.some(pattern => getFieldName(info).startsWith(pattern)) &&
      ctx.user.role !== 'admin'
    ) {
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
      addToWaitlist: allow,
      addInviteCode: admin,
      googleAuth: allow,
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
    fallbackRule: allow,
  },
);
