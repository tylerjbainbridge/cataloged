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
import { ITEM_FULL_FRAGMENT } from '../graphql/item';

import { GridFeed } from './GridFeed';
import { feed_items, feed } from '../graphql/__generated__/feed';
import { FeedBottomToolbar } from './FeedBottomToolbar';

export const FEED_QUERY = gql`
  query feed(
    $first: Int
    $skip: Int
    $search: String
    $type: ItemType
    $where: ItemWhereInput
  ) {
    items(
      first: $first
      skip: $skip
      where: $where
      search: $search
      type: $type
      orderBy: { createdAt: desc }
    ) @connection(key: "feed_items") {
      ...ItemFull
    }
  }

  ${ITEM_FULL_FRAGMENT}
`;

export const FEED_PAGE_LENGTH = 30;

type FeedContext = {
  mode: 'grid' | 'list';
  nextPage: () => any;
  activeItemId: feed_items['id'] | null;
  setActiveItemId: (id: feed_items['id']) => any;
  // viewNextItem: (item: feed_items) => any;
  isLastItem: (item: feed_items) => any;
};

export const FeedContext = React.createContext<FeedContext>({} as FeedContext);

export const Feed = () => {
  const [mode, setMode] = useLocalStorage<'grid' | 'list'>('feed-mode', 'grid');
  const [isLastPage, setIsLastPage] = useState(false);
  const [activeItemId, setActiveItemId] = useState<feed_items['id'] | null>(
    null,
  );
  const [pageNum, setPage] = useState(1);

  const { paginationVariables } = usePagination({
    pageLength: FEED_PAGE_LENGTH,
  });

  const query = useQuery<feed>(FEED_QUERY, {
    variables: paginationVariables,
    notifyOnNetworkStatusChange: true,
  });

  const { loading, data, networkStatus, refetch, fetchMore, variables } = query;

  const prevQuery: QueryResult<feed, Record<string, any>> = usePrevious(query);

  // Spaghetti Pagination
  useEffect(() => {
    if (data && prevQuery.data) {
      const isLast =
        _.last(data.items)?.id === _.last(prevQuery.data.items)?.id;

      if (isLast) setIsLastPage(true);
      else if (pageNum === 0) setIsLastPage(false);

      if (data.items.length > prevQuery.data.items.length) {
        setPage(pageNum + 1);
      } else if (
        data.items.length < prevQuery.data.items.length &&
        pageNum !== 0
      ) {
        setPage(0);
      }
    }
  }, [data]);

  const initialLoad = loading && !data;

  const filter = (filterVariables: any) =>
    refetch({
      ...paginationVariables,
      ...filterVariables,
    });

  const nextPage = () =>
    fetchMore({
      variables: {
        ...variables,
        skip: FEED_PAGE_LENGTH * pageNum,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          items: [...(prev.items || []), ...(fetchMoreResult.items || [])],
        };
      },
    });

  const isLastItem = ({ id }: feed_items) => {
    const lastItem = _.last(data?.items || []);
    return lastItem && lastItem.id === id;
  };

  return (
    <FeedContext.Provider
      value={{
        mode,
        nextPage,
        isLastItem,
        activeItemId,
        setActiveItemId,
      }}
    >
      <UploadProgress />
      <SelectContainer items={data?.items || []}>
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
                <GridFeed query={query} nextPage={nextPage} />
              )}
              {networkStatus === 7 && !loading && !isLastPage && (
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
