import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';

import { Box } from '@chakra-ui/core';

import { useQuery } from '@apollo/client';
import { FilterInputPlayground } from '../components/FilterInputPlayground';
import { FEED_QUERY } from '../components/Feed';
import { CollectonPlayground } from '../components/CollectionPlayground';
import { getNodesFromConnection } from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';

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

const useSomeItems = () => {
  const { loading, data } = useQuery(FEED_QUERY, {
    variables: { first: 10 },
    notifyOnNetworkStatusChange: true,
  });

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  return { loading, data, items };
};

export const Playground = () => {
  // const { item } = useMostRecentItem();
  const { items } = useSomeItems();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        d="flex"
        margin={20}
        padding={20}
        size={600}
        width={900}
        // bg="lightgray"
        // borderStyle="solid"
        // borderColor="lightgray"
        // borderWidth={2}
        rounded="lg"
      >
        {items?.length && <CollectonPlayground items={items} />}
      </Box>
    </Box>
  );
};
