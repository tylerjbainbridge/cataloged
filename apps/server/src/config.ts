import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://3cbc91c3ee1e456db2c87d85b24f197c@sentry.io/1553570',
});

export { Sentry };
