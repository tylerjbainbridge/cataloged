import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getGoogleUrl } from './__generated__/getGoogleUrl';
import { Segment, Button } from 'semantic-ui-react';

const GET_GOOGLE_URL = gql`
  query getGoogleUrl {
    googleURL
  }
`;

export const ForceSignIn = () => {
  const { loading, data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL);

  return (
    <Segment
      basic
      loading={loading}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Button
        disabled={!!(loading && data && data.googleURL)}
        onClick={() => {
          if (data && data.googleURL) {
            window.location.replace(data.googleURL);
          }
        }}
      >
        Sign in with Google
      </Button>
    </Segment>
  );
};
