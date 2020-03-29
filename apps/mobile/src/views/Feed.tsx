import { useQuery } from '@apollo/client';
import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { FEED_QUERY } from 'cataloged-shared/queries/feed';
import _ from 'lodash';
import React from 'react';
import { SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Box, Text } from '../components/UI';
import { SignOut } from '../components/SignOut';
import { GridItem } from '../components/GridItem';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';

export const Feed = () => {
  const { user } = useAuth();

  const INITIAL_PAGINATION_VARIABLES = {
    first: 40,
    after: null,
  };

  const query = useQuery(FEED_QUERY, {
    variables: {
      ...INITIAL_PAGINATION_VARIABLES,
      filters: [],
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    // 5 seconds
    // pollInterval: 5000,
  });

  const {
    loading,
    data,
    error,
    networkStatus,
    refetch,
    fetchMore,
    variables,
  } = query;

  const items = (data?.itemsConnection?.edges || []).map(
    ({ node }: any) => node,
  );

  const initialLoad = loading && !data;

  const lastEdge = _.last(data?.itemsConnection?.edges || []);

  const nextPage = () => {
    return fetchMore({
      variables: {
        ...variables,
        after: lastEdge?.cursor,
      },
      // @ts-ignore
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.itemsConnection?.edges;
        const pageInfo = fetchMoreResult?.itemsConnection?.pageInfo;

        return newEdges?.length
          ? {
              itemsConnection: {
                __typename: previousResult.itemsConnection.__typename,
                edges: [...previousResult.itemsConnection.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  console.log(query);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box width="100%" height="100%" display="flex">
        <Box height={50} width="100%">
          {/* <Text>Cataloged</Text> */}
        </Box>
        <FlatList
          data={items}
          renderItem={({ item }: { item: ItemFull }) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              marginBottom={20}
            >
              <GridItem item={item} />
            </Box>
          )}
        ></FlatList>
      </Box>
    </>
  );
};
