import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLocalStorage } from 'react-use';
import { Box, Spinner } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';
import queryString from 'query-string';

import { SelectContainer } from './SelectContainer';
import { CreateFiles } from './CreateFiles';
import { CreateLink } from './CreateLink';
import { SignOut } from './SignOut';
import { UploadProgress } from './UploadProgress';
import { Filter } from './Filter';
import { NoteModal } from './NoteModal';
import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';

import { GridFeed } from './GridFeed';
import { FeedBottomToolbar } from './FeedBottomToolbar';
import {
  getNodesFromConnection,
  getFilterVariablesFromFormValues,
  getFormValuesFromFilterVariables,
  getFilterVariablesFromQueryString,
} from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { feed, feedVariables } from '../graphql/__generated__/feed';
import { FeedModals } from './FeedModals';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ListFeed } from './ListFeed';

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
  filter: (feedVariables: feedVariables) => any;
};

export const FeedContext = React.createContext<FeedContext>({} as FeedContext);

const INITIAL_PAGINATION_VARIABLES = {
  first: 20,
  after: null,
};

export const Feed = () => {
  const [mode, setMode] = useState<'grid' | 'list'>('grid');
  const [activeItemId, setActiveItemId] = useState<ItemFull['id'] | null>(null);
  const { user } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const [filters, setFilters] = useState<feedVariables>(
    getFilterVariablesFromQueryString(location.search, user),
  );

  console.log({ mode });

  const query = useQuery<feed>(FEED_QUERY, {
    variables: {
      ...INITIAL_PAGINATION_VARIABLES,
      ...filters,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  const initialLoad = loading && !data;

  const filter = (filterVariables: any) =>
    setFilters({
      ...filterVariables,
    });

  useEffect(() => {
    if (!loading) {
      refetch({
        ...INITIAL_PAGINATION_VARIABLES,
        ...filters,
      });

      // @ts-ignore
      history.replace({
        search: queryString.stringify(
          getFormValuesFromFilterVariables(filters, user, true),
          { arrayFormat: 'bracket' },
        ),
      });
    }
  }, [filters]);

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

  const openItemModal = (item: ItemFull) => setActiveItemId(item.id);

  return (
    <FeedContext.Provider
      value={{
        mode,
        nextPage,
        isLastItem,
        activeItemId,
        setActiveItemId,
        openItemModal,
        items,
        filter,
      }}
    >
      <UploadProgress />
      <FeedModals />
      <SelectContainer>
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
                <Filter variables={variables} />
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
              ) : mode === 'grid' ? (
                <GridFeed query={query} />
              ) : (
                <ListFeed query={query} />
              )}
              {networkStatus === 7 &&
                !loading &&
                data?.itemsConnection?.pageInfo?.hasNextPage && (
                  <Waypoint bottomOffset={-400} onEnter={nextPage} />
                )}

              {loading && (
                <Box
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                >
                  <Spinner size="md" />
                </Box>
              )}
            </Box>
          </Box>
          <FeedBottomToolbar />
        </Box>
      </SelectContainer>
    </FeedContext.Provider>
  );
};
