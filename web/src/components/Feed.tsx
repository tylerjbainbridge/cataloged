import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Box, Spinner, Button, Tooltip, Text } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

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
  getFeedVariablesFromQueryString,
  getQueryStringFromFilters,
} from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { feed, feedVariables } from '../graphql/__generated__/feed';
import { FeedModals } from './FeedModals';
import {
  useLocation,
  useHistory,
  Router,
  BrowserRouter,
  Route,
  Switch,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ListFeed } from './ListFeed';
import { FaThLarge, FaList } from 'react-icons/fa';
import { NewFilter } from './NewFilter';
import { FeedDrawerItemView } from '../routes/FeedDrawerItemView';
import { usePrevious } from '../hooks/usePrevious';

export const FEED_QUERY = gql`
  query feed($first: Int, $after: String, $filters: [Filter!]) {
    itemsConnection(
      first: $first
      after: $after

      filters: $filters

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
  initialLoad: boolean;
  loading: boolean;
  variables: feedVariables;
};

export const FeedContext = React.createContext<FeedContext>({} as FeedContext);

export const Feed = () => {
  const isViewingItem = useRouteMatch({
    path: '/item/:id',
    // strict: true,
    // sensitive: true,
  });

  const [mode, setMode] = useState<'grid' | 'list'>(
    // @ts-ignore
    localStorage.getItem('grid-mode') || 'grid',
  );

  const [activeItemId, setActiveItemId] = useState<ItemFull['id'] | null>(null);

  const feedContainerRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const INITIAL_PAGINATION_VARIABLES = {
    first: mode === 'grid' ? 30 : 50,
    after: null,
  };

  useEffect(() => {
    localStorage.setItem('grid-mode', mode);
  }, [mode]);

  const query = useQuery<feed>(FEED_QUERY, {
    variables: {
      ...INITIAL_PAGINATION_VARIABLES,
      ...getFeedVariablesFromQueryString(location.search),
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  const initialLoad = loading && !data;

  const filter = (filterVariables: any) =>
    refetch({
      ...filterVariables,
    });

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      history.replace({
        // @ts-ignore
        search: getQueryStringFromFilters(variables.filters || [], location),
      });
    }
  }, [variables]);

  useEffect(() => {
    if (isViewingItem) {
      // @ts-ignore
      if (feedContainerRef.current) disableBodyScroll(feedContainerRef.current);
    } else if (feedContainerRef.current) {
      // @ts-ignore
      enableBodyScroll(feedContainerRef.current);
    }
  }, [isViewingItem]);

  const { filters } = variables;

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
        initialLoad,
        loading,
        variables,
      }}
    >
      <UploadProgress />
      <FeedModals />
      <SelectContainer>
        <Box width="100%">
          {/* <Switch> */}
          <Box d="flex" justifyContent="center" width="100%">
            <Box padding={50} width="100%">
              <Box
                height={80}
                d="flex"
                minWidth="100%"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                position="sticky"
                top={0}
                zIndex={1}
                bg="rgb(255, 255, 255, 0.7)"
              >
                <Box />
                <NewFilter variables={variables} loading={loading} />
                {/* <Filter variables={variables} loading={loading} /> */}
                {/* <Text fontSize="4xl" margin={0}>
                 Cataloged
               </Text> */}
                <Tooltip
                  hasArrow
                  label={mode === 'grid' ? 'list view' : 'grid view'}
                  aria-label="set mode"
                  zIndex={10}
                >
                  <Button
                    cursor="pointer"
                    onClick={() =>
                      mode === 'grid' ? setMode('list') : setMode('grid')
                    }
                  >
                    {mode === 'grid' ? (
                      <FaList size={15} />
                    ) : (
                      <FaThLarge size={15} />
                    )}
                  </Button>
                </Tooltip>
              </Box>
              <br />
              <Box ref={feedContainerRef}>
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
                ) : !items.length ? (
                  <Box
                    d="flex"
                    justifyContent="center"
                    height="100%"
                    width="100%"
                  >
                    <Text>
                      {filters.length ? 'No results' : 'No items found'}
                    </Text>
                  </Box>
                ) : mode === 'grid' ? (
                  <GridFeed query={query} />
                ) : (
                  <ListFeed query={query} />
                )}
                {networkStatus === 7 &&
                  !loading &&
                  data?.itemsConnection?.pageInfo?.hasNextPage && (
                    <Waypoint bottomOffset={-700} onEnter={nextPage} />
                  )}
              </Box>

              {loading && !!items?.length && (
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

          {/* </Switch> */}
          <FeedBottomToolbar />
        </Box>
      </SelectContainer>
    </FeedContext.Provider>
  );
};
