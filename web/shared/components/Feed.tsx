import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
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
import {
  FaThLarge,
  FaList,
  FaSave,
  FaEdit,
  FaTimesCircle,
} from 'react-icons/fa';

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
import { useItems } from '../hooks/useItems';

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

export type FeedContext = {
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

  const [pageNum, setPageNum] = useState(1);

  const isMobile = useMedia('(max-width: 768px)');

  const [cursorItemId, setCursorItemId] = useState<ItemFull['id'] | null>(null);

  const feedContainerRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const isViewingItem = !!qs.parse(location.search)?.itemId;
  const isViewingSettings = useRouteMatch('*/settings');
  const isViewingSearch = useRouteMatch('/search/:id');

  const INITIAL_PAGINATION_VARIABLES = {
    first: 40,
    // first: mode === 'grid' ? 30 : 50,
    after: null,
  };

  useEffect(() => {
    localStorage.setItem('grid-mode', mode);
  }, [mode]);

  const filters = getFiltersFromQueryString(location.search);

  const { items, lastItem, isLastPage } = useItems({ pageNum });

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

  const prevFilters = usePrevious(filters);

  const isLastItem = ({ id }: ItemFull) => {
    return lastItem?.id === id;
  };

  const openItemModal = (item: ItemFull) => setCursorItemId(item.id);

  const isItemCursor = (item: ItemFull) => item.id === cursorItemId;

  const currentSidebarWidth =
    // @ts-ignore
    document.querySelector('#sidebar-container')?.offsetWidth;

  const updateFilters = (newFilters: any[]) => {
    if (prevFilters?.length !== newFilters.length) {
      history.replace({
        pathname: window.location.pathname,
        search: getQueryStringFromFilters(newFilters, window.location.search),
      });

      // refetch();
    }
  };

  const nextPage = () => setPageNum(pageNum + 1);

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
  useHotKey('right', moveCursorToNextItem);

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
  useHotKey('left', moveCursorToPrevItem);

  // useHotKey(
  //   'esc',
  //   () => {
  //     setCursorItemId(null);
  //   },
  //   { shouldBind: !!cursorItem },
  // );

  // highlightedIndex <= 0 ? null : highlightedIndex - 1,

  return isMobile && sidebarState.isOpen ? null : (
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
      }}
    >
      <UploadProgress />
      {/* <FeedModals /> */}
      <SelectContainer>
        <CommandCenter />
        {/* {isViewingItem && !isViewingSettings && <FeedDrawerItemView />} */}
        <Box d="flex" justifyContent="center" flex="1">
          {/* <Switch> */}
          <TopNavBar
            middleNode={
              !isMobile ? (
                <Box
                  d="flex"
                  alignItems="center"
                  height="30px"
                  width="700px"
                  maxWidth={isMobile ? '100%' : '700px'}
                >
                  <Box
                    d="flex"
                    alignItems="center"
                    mb="-20px"
                    color="lightgray"
                    height="30px"
                    width="20px"
                  >
                    {false ? <Spinner size="sm" /> : <Box />}
                  </Box>

                  <Box
                    d="flex"
                    width="650px"
                    height="40px"
                    rounded="lg"
                    p="10px"
                  >
                    <FilterSearchInput
                      filters={filters}
                      onChange={(filters: any) => {
                        updateFilters(filters);
                      }}
                    />
                  </Box>

                  <AddOrUpdateSavedSearch filters={filters}>
                    {({ onOpen, match }: any) =>
                      !!filters?.length && (
                        <Tooltip
                          aria-label="add filter"
                          zIndex={22}
                          hasArrow
                          label={
                            filters?.length
                              ? 'Update (or create) search'
                              : 'Save this search'
                          }
                        >
                          <Button
                            cursor="pointer"
                            aria-label="add filter"
                            type="button"
                            alignSelf="flex-end"
                            variant="ghost"
                            height="30px"
                            onClick={onOpen}
                            mb="-10px"
                            // isDisabled={!filters.length}
                          >
                            {isViewingSearch ? (
                              <FaEdit size={15} />
                            ) : (
                              <FaSave size={15} />
                            )}
                          </Button>
                        </Tooltip>
                      )
                    }
                  </AddOrUpdateSavedSearch>
                  {!!filters?.length && (
                    <Tooltip
                      hasArrow
                      label="clear filters"
                      aria-label="clear filters"
                      zIndex={22}
                    >
                      <Button
                        mb="-10px"
                        height="30px"
                        cursor="pointer"
                        aria-label="clear filter"
                        type="button"
                        alignSelf="flex-end"
                        variant="ghost"
                        onClick={() => {
                          updateFilters([]);
                        }}
                      >
                        <FaTimesCircle size={15} />
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              ) : (
                <Filter
                  filters={filters}
                  onDebouncedFilterChange={updateFilters}
                />
              )
            }
            rightNode={
              <Box>
                <Tooltip
                  hasArrow
                  label={mode === 'grid' ? 'list view' : 'grid view'}
                  aria-label="set mode"
                  zIndex={22}
                >
                  <Button
                    cursor="pointer"
                    variant="ghost"
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
                {false && !items.length ? (
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
                  <GridFeed />
                ) : (
                  <ListFeed />
                )}
                {!isLastPage && (
                  <Waypoint bottomOffset={-700} onEnter={nextPage} />
                )}
              </Box>

              {items.length > FEED_PAGE_LENGTH && (
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
        {/* <Box pr="100px" d="flex" position="fixed" bottom={0} right={0} zIndex={2}>
          <Button>test</Button>
        </Box> */}
        <FeedBottomToolbar
          width={
            sidebarState.isOpen
              ? `calc(100% - ${currentSidebarWidth || 0}px)`
              : '100%'
          }
        />
      </SelectContainer>
    </FeedContext.Provider>
  );
};
