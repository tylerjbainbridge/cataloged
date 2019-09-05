import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getGoogleUrl } from './__generated__/getGoogleUrl';

const GET_GOOGLE_URL = gql`
  query getGoogleUrl {
    googleURL
  }
`;

export const ForceLogin = () => {
  const { loading, data } = useQuery<getGoogleUrl>(GET_GOOGLE_URL);

  useEffect(() => {
    if (data && data.googleURL) {
      window.location.replace(data.googleURL);
    }
  }, [loading]);

  return null;
};
