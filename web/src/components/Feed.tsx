import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Box,
  Spinner,
  Button,
  Tooltip,
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';
import qs from 'query-string';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { SelectContainer } from './SelectContainer';

import { UploadProgress } from './UploadProgress';

import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';

import { GridFeed } from './GridFeed';
import { FeedBottomToolbar } from './FeedBottomToolbar';
import {
  getNodesFromConnection,
  getFeedVariablesFromQueryString,
  getQueryStringFromFilters,
} from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { feed, feedVariables } from '../graphql/__generated__/feed';
import { FeedModals } from './FeedModals';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

import { ListFeed } from './ListFeed';
import { FaThLarge, FaList } from 'react-icons/fa';
import { NewFilter } from './NewFilter';
import { useMedia } from 'react-use';
import { usePrevious } from '../hooks/usePrevious';

export const FEED_QUERY = gql`
  query feed($first: Int, $after: String, $filters: [FilterInput!]) {
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

export const Feed = ({ sidebarState }: { sidebarState: any }) => {
  const [mode, setMode] = useState<'grid' | 'list'>(
    // @ts-ignore
    localStorage.getItem('grid-mode') || 'grid',
  );

  const isMobile = useMedia('(max-width: 768px)');

  const [activeItemId, setActiveItemId] = useState<ItemFull['id'] | null>(null);

  const feedContainerRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const isViewingItem = !!qs.parse(location.search)?.itemId;

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

  // useEffect(() => {
  //   if (!loading) {
  //     // @ts-ignore
  //     history.replace({
  //       // @ts-ignore
  //       search: getQueryStringFromFilters(variables.filters || [], location),
  //     });
  //   }
  // }, [variables]);

  useEffect(() => {
    if (!isMobile) {
      if (isViewingItem) {
        if (feedContainerRef.current) {
          // @ts-ignore
          disableBodyScroll(feedContainerRef.current);
        }
      } else if (feedContainerRef.current) {
        // @ts-ignore
        enableBodyScroll(feedContainerRef.current);
      }
    }
  }, [isViewingItem]);

  const prevLocation = usePrevious(location);

  useEffect(() => {
    if (prevLocation && prevLocation.search !== location.search) {
      // refetch(getFeedVariablesFromQueryString(location.search));
    }
  }, [location.search]);

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

  const currentSidebarWidth =
    // @ts-ignore
    document.querySelector('#sidebar-container')?.offsetWidth;

  const onDebouncedFilterChange = (newFilters: any[]) => {
    history.replace({
      pathname: window.location.pathname,
      search: getQueryStringFromFilters(newFilters, location),
    });
  };

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
        <Box d="flex" justifyContent="center" flex="1">
          {/* <Switch> */}
          <Box
            height={80}
            d="flex"
            flex="1"
            width={
              sidebarState.isOpen || !isMobile
                ? `calc(100% - ${currentSidebarWidth || 0}px)`
                : '100%'
            }
            justifyContent="center"
            alignItems="center"
            position="fixed"
            top={0}
            zIndex={1}
            padding="20px"
            bg="rgb(255, 255, 255, 0.7)"
          >
            <Box
              d="flex"
              justifyContent="space-between"
              alignItems="center"
              width={isMobile ? '100%' : '80%'}
            >
              {isMobile ? (
                <Button cursor="pointer" onClick={sidebarState.onToggle}>
                  <Icon
                    name={sidebarState.isOpen ? 'arrow-left' : 'arrow-right'}
                    aria-label={
                      sidebarState.isOpen ? 'close sidebar' : 'open sidebar'
                    }
                    width="15px"
                  />
                </Button>
              ) : (
                <Box />
              )}
              {sidebarState.isOpen && isMobile ? null : (
                <>
                  <NewFilter
                    variables={variables}
                    loading={loading}
                    onDebouncedFilterChange={onDebouncedFilterChange}
                  />
                  <Box>
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
                </>
              )}
            </Box>
          </Box>

          <Box d="flex" justifyContent="center" mt="100px" width="100%">
            <Box width={isMobile ? '100%' : '90%'} mr="20px" ml="20px">
              <Box ref={feedContainerRef}>
                {initialLoad && !items.length ? (
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
                    <Text textAlign="center">
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

              {loading && items.length > FEED_PAGE_LENGTH && (
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
        </Box>
        <FeedBottomToolbar
          width={
            sidebarState.isOpen || !isMobile
              ? `calc(100% - ${currentSidebarWidth || 0}px)`
              : '100%'
          }
        />
      </SelectContainer>
    </FeedContext.Provider>
  );
};
