import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { QueryResult } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLocalStorage } from 'react-use';
import { Box, usePrevious, Spinner } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';

import { SelectContainer } from './SelectContainer';
import { usePagination } from '../hooks/useVariables';
import { CreateFiles } from './CreateFiles';
import { CreateLink } from './CreateLink';
import { SignOut } from './SignOut';
import { UploadProgress } from './UploadProgress';
import { Filter } from './Filter';
import { NoteModal } from './NoteModal';
import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';

import { GridFeed } from './GridFeed';
import { FeedBottomToolbar } from './FeedBottomToolbar';
import { getNodesFromConnection } from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { feed } from '../graphql/__generated__/feed';
import { FeedModals } from './FeedModals';

export const FEED_QUERY = gql`
  query feed(
    $first: Int
    $after: String
    $search: String
    $type: ItemType
    $where: ItemWhereInput
  ) {
    itemsConnection(
      first: $first
      after: $after

      where: $where
      search: $search
      type: $type

      orderBy: { createdAt: desc }
    ) @connection(key: "feed_connection") {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;

export const FEED_PAGE_LENGTH = 30;

type FeedContext = {
  mode: 'grid' | 'list';
  nextPage: () => any;
  activeItemId: ItemFull['id'] | null;
  setActiveItemId: (id: ItemFull['id'] | null) => any;
  // viewNextItem: (item: ItemFull) => any;
  isLastItem: (item: ItemFull) => any;
  items: ItemFull[];
  openItemModal: (item: ItemFull) => any;
};

export const FeedContext = React.createContext<FeedContext>({} as FeedContext);

const INITIAL_PAGINATION_VARIABLES = {
  first: 20,
  after: null,
};

export const Feed = () => {
  const [mode, setMode] = useLocalStorage<'grid' | 'list'>('feed-mode', 'grid');
  const [activeItemId, setActiveItemId] = useState<ItemFull['id'] | null>(null);

  const query = useQuery<feed>(FEED_QUERY, {
    variables: INITIAL_PAGINATION_VARIABLES,
    notifyOnNetworkStatusChange: true,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  const initialLoad = loading && !data;

  const filter = (filterVariables: any) =>
    refetch({
      ...INITIAL_PAGINATION_VARIABLES,
      ...filterVariables,
    });

  const lastEdge = _.last(data?.itemsConnection?.edges || []);

  const nextPage = () =>
    fetchMore({
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

  const isLastItem = ({ id }: ItemFull) => {
    return lastEdge?.node?.id === id;
  };

  return (
    <FeedContext.Provider
      value={{
        mode,
        nextPage,
        isLastItem,
        activeItemId,
        setActiveItemId,
        items,
        openItemModal: (item: ItemFull) => setActiveItemId(item.id),
      }}
    >
      <UploadProgress />
      <FeedModals />
      <SelectContainer items={items}>
        <Box height="100%">
          <Box d="flex" justifyContent="center" height="100%">
            <Box
              padding={50}
              width={[
                '100%', // base
                '100%', // 480px upwards
                '90%', // 768px upwards
              ]}
            >
              <Box
                height={80}
                d="flex"
                minWidth="100%"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
              >
                <Box
                  d="flex"
                  width="150px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <CreateFiles />
                  <CreateLink />
                  <NoteModal />
                </Box>
                <Filter filter={filter} variables={variables} />
                {/* <Text fontSize="4xl" margin={0}>
                Cataloged
              </Text> */}
                <SignOut />
              </Box>
              <br />
              {initialLoad ? (
                <Box
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                >
                  <Spinner size="xl" />
                </Box>
              ) : (
                <GridFeed items={items} query={query} nextPage={nextPage} />
              )}
              {networkStatus === 7 &&
                !loading &&
                data?.itemsConnection?.pageInfo?.hasNextPage && (
                  <Waypoint bottomOffset={-400} onEnter={nextPage} />
                )}
            </Box>
          </Box>
          <FeedBottomToolbar />
        </Box>
      </SelectContainer>
    </FeedContext.Provider>
  );
};
