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
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { FaThLarge, FaList, FaSave } from 'react-icons/fa';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { SelectContainer } from './SelectContainer';

import { UploadProgress } from './UploadProgress';

import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';

import { GridFeed } from './GridFeed';
import { FeedBottomToolbar } from './FeedBottomToolbar';
import {
  getNodesFromConnection,
  getFiltersFromQueryString,
  getQueryStringFromFilters,
  scrollToItemIfOutOfView,
} from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { feed, feedVariables } from '../graphql/__generated__/feed';
import { FeedModals } from './FeedModals';

import { ListFeed } from './ListFeed';
import { Filter } from './Filter';
import { useMedia } from 'react-use';
import { usePrevious } from '../hooks/usePrevious';
import { TopNavBar } from './TopNavBar';
import { FeedDrawerItemView } from '../routes/FeedDrawerItemView';
import { CommandCenter } from './CommandCenter';
import FilterSearchInput from './FilterSearchInput';
import { AddOrUpdateSavedSearch } from './AddOrUpdateSavedSearch';
import { useHotKey } from '../hooks/useHotKey';

export const FEED_QUERY = gql`
  query feed($first: Int, $after: String, $filters: [FilterInput!]) {
    itemsConnection(
      first: $first
      after: $after

      filters: $filters

      orderBy: { date: desc }
    ) @connection(key: "feed_connection") {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;

export const FEED_PAGE_LENGTH = 30;

type FeedContext = {
  mode: 'grid' | 'list';
  setMode: (mode: 'grid' | 'list') => any;
  nextPage: () => any;
  cursorItemId: ItemFull['id'] | null;
  setCursorItemId: (id: ItemFull['id'] | null) => any;
  isItemCursor: (item: ItemFull) => boolean;
  moveCursorToNextItem: (item: ItemFull) => any;
  moveCursorToPrevItem: (item: ItemFull) => any;
  cursorItem?: ItemFull | null;
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

  const [cursorItemId, setCursorItemId] = useState<ItemFull['id'] | null>(null);

  const feedContainerRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const isViewingItem = !!qs.parse(location.search)?.itemId;
  const isViewingSettings = useRouteMatch('*/settings');

  const INITIAL_PAGINATION_VARIABLES = {
    first: mode === 'grid' ? 30 : 50,
    after: null,
  };

  useEffect(() => {
    localStorage.setItem('grid-mode', mode);
  }, [mode]);

  const queryStringFilters = getFiltersFromQueryString(location.search);

  const query = useQuery<feed>(FEED_QUERY, {
    variables: {
      ...INITIAL_PAGINATION_VARIABLES,
      ...(queryStringFilters ? { filters: queryStringFilters } : {}),
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    // 5 seconds
    // pollInterval: 5000,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const items = getNodesFromConnection<ItemFull>(data?.itemsConnection);

  const initialLoad = loading && !data;

  const filter = (filterVariables: any) =>
    refetch({
      ...filterVariables,
    });

  // TODO: FIX SCROLL TO LOGIC
  // useEffect(() => {
  //   window.scrollTo(0, 100);
  // }, [location?.search]);

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
      // refetch(getFiltersFromQueryString(location.search));
    }
  }, [location.search]);

  const { filters } = variables;

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

  const isLastItem = ({ id }: ItemFull) => {
    return lastEdge?.node?.id === id;
  };

  const openItemModal = (item: ItemFull) => setCursorItemId(item.id);

  const isItemCursor = (item: ItemFull) => item.id === cursorItemId;

  const currentSidebarWidth =
    // @ts-ignore
    document.querySelector('#sidebar-container')?.offsetWidth;

  const onDebouncedFilterChange = (newFilters: any[]) => {
    history.replace({
      pathname: window.location.pathname,
      search: getQueryStringFromFilters(newFilters, window.location.search),
    });
  };

  const cursorItem = cursorItemId
    ? items.find(({ id }) => cursorItemId === id)
    : null;

  const moveCursorToNextItem = () => {
    const currentCursorIndex = items.findIndex(
      (item: ItemFull) => item.id === cursorItemId,
    );

    let newCursor: ItemFull['id'] | null = null;

    if (currentCursorIndex !== -1 && currentCursorIndex !== items.length - 1) {
      newCursor = items[currentCursorIndex + 1]?.id;
    } else if (items.length) {
      newCursor = items[0]?.id;
    }

    if (newCursor) {
      setCursorItemId(newCursor);
      scrollToItemIfOutOfView(newCursor);
    }
  };

  useHotKey('down', moveCursorToNextItem);

  const moveCursorToPrevItem = () => {
    const currentCursorIndex = items.findIndex(
      (item: ItemFull) => item.id === cursorItem?.id,
    );

    if (currentCursorIndex !== -1 && currentCursorIndex !== items.length - 1) {
      let newCursor: ItemFull['id'] | null = items[currentCursorIndex - 1]?.id;
      setCursorItemId(newCursor);
      if (newCursor) scrollToItemIfOutOfView(newCursor);
      else window.scrollTo(0, 0);
    }
  };

  useHotKey('up', moveCursorToPrevItem);

  // highlightedIndex <= 0 ? null : highlightedIndex - 1,

  return (
    <FeedContext.Provider
      value={{
        mode,
        setMode,
        nextPage,
        isLastItem,
        cursorItemId,
        setCursorItemId,
        cursorItem,
        moveCursorToNextItem,
        moveCursorToPrevItem,
        isItemCursor,
        openItemModal,
        items,
        filter,
        initialLoad,
        loading,
        variables,
      }}
    >
      <UploadProgress />
      {/* <FeedModals /> */}
      <SelectContainer>
        <CommandCenter />
        {isViewingItem && !isViewingSettings && <FeedDrawerItemView />}
        <Box d="flex" justifyContent="center" flex="1">
          {/* <Switch> */}
          <TopNavBar
            middleNode={
              !isMobile ? (
                <Box
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="550px"
                  maxWidth={isMobile ? '100%' : '550px'}
                >
                  <Box d="flex" width="490px" rounded="lg" p="10px">
                    <FilterSearchInput
                      filters={queryStringFilters}
                      onChange={onDebouncedFilterChange}
                    />
                  </Box>
                  {/* {true && (
                      <Spinner
                        position="absolute"
                        fontSize="10px"
                        size="sm"
                        color="lightgray"
                      />
                    )} */}
                  <AddOrUpdateSavedSearch filters={queryStringFilters}>
                    {({ onOpen, match }: any) => (
                      <Tooltip
                        aria-label="add filter"
                        zIndex={10}
                        hasArrow
                        label={
                          match ? 'Update or create new' : 'Save this search'
                        }
                      >
                        <Button
                          m="10px"
                          cursor="pointer"
                          aria-label="add filter"
                          type="button"
                          alignSelf="flex-end"
                          variant="outline"
                          onClick={onOpen}
                          // isDisabled={!queryStringFilters.length}
                        >
                          <FaSave />
                        </Button>
                      </Tooltip>
                    )}
                  </AddOrUpdateSavedSearch>
                </Box>
              ) : (
                <Filter
                  variables={variables}
                  loading={networkStatus !== 6 && loading}
                  onDebouncedFilterChange={onDebouncedFilterChange}
                />
              )
            }
            rightNode={
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
            }
          />

          <Box d="flex" justifyContent="center" mt="100px" width="100%">
            <Box
              width={isMobile ? '100%' : mode === 'grid' ? '95%' : '90%'}
              mr="20px"
              ml="20px"
            >
              <Box ref={feedContainerRef}>
                {initialLoad && !items.length ? (
                  <Box
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    {/* <Spinner size="xl" /> */}
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
                {data &&
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
