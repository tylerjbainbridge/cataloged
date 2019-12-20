import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';

import { Box } from '@chakra-ui/core';

import { Labels } from '../components/Labels';
import { useQuery } from '@apollo/react-hooks';

const GET_MOST_RECENT_ITEM = gql`
  query mostRecentItem($type: String) {
    mostRecentItem(type: $type) {
      id
      type

      labels {
        id
        name
      }

      link {
        id
        href
        notes

        image
        favicon
        title
        description
      }

      file {
        id
        name
        extension
        isUploaded
        fullUrl
        squareUrl
      }
    }
  }
`;

const useMostRecentItem = () => {
  const { loading, data } = useQuery(GET_MOST_RECENT_ITEM, {
    variables: { type: 'link' },
    notifyOnNetworkStatusChange: true,
  });

  return { loading, data, item: !loading && data ? data.mostRecentItem : null };
};

export const Playground = () => {
  const { item } = useMostRecentItem();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        d="flex"
        margin={20}
        padding={20}
        size={400}
        // borderStyle="solid"
        // borderColor="lightgray"
        // borderWidth={2}
        rounded="lg"
        justifyContent="center"
      >
        {item && <Labels item={item} />}
      </Box>
    </Box>
  );
};