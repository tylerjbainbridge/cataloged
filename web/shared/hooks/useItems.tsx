import React, { useState, useEffect } from 'react';
import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';
import { useLazyQuery, gql, useQuery, useApolloClient } from '@apollo/client';
import { feed } from '../graphql/__generated__/feed';
import { getNodesFromConnection } from '../util/helpers';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import _ from 'lodash';
import {
  ItemConnectionFull_edges,
  ItemConnectionFull,
} from '../graphql/__generated__/ItemConnectionFull';

export const FEED_QUERY = gql`
  query feed($first: Int, $after: String, $filters: [FilterInput!]) {
    itemsConnection(
      first: $first
      after: $after

      filters: $filters

      orderBy: { date: desc }
    ) @connection(key: "item_cache") {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;

export const FEED_PAGE_QUERY = gql`
  query feed($first: Int, $after: String) {
    itemsConnection(first: $first, after: $after, orderBy: { date: desc })
      @connection(key: "feed_page") {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;

export interface UseItemsArgs {
  pageNum?: number;
  pageLength?: number;
}

export const useItems = ({
  pageNum = 1,
  pageLength = 50,
}: UseItemsArgs = {}) => {
  const client = useApolloClient();

  const query = useQuery<feed>(FEED_QUERY, {
    variables: {
      first: 500,
      after: null,
    },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    // 5 seconds
    // pollInterval: 5000,
  });

  const allItems = getNodesFromConnection<ItemFull>(
    query.data?.itemsConnection,
  );

  const lastItem: ItemFull | undefined = _.last(allItems);

  const fetchPage = async (after: string | null) =>
    await client.query({
      query: FEED_PAGE_QUERY,
      fetchPolicy: 'no-cache',
      variables: {
        first: 500,
        after,
      },
    });

  const syncWithServer = async () => {
    let itemsConnection: ItemConnectionFull = {
      __typename: 'ItemConnection',
      edges: [],
      // @ts-ignore
      pageInfo: {},
    };

    const updateItemsConnection = (data: any) => {
      itemsConnection = {
        ...itemsConnection,
        edges: [...itemsConnection.edges, ...data.itemsConnection.edges],
        pageInfo: data.itemsConnection.pageInfo,
      };
    };

    let last = await fetchPage(null);
    updateItemsConnection(last.data);

    let i = 0;
    console.log('fetched page', i);

    // @ts-ignore
    while (last.data?.itemsConnection?.pageInfo?.hasNextPage) {
      i++;
      last = await fetchPage(last.data?.itemsConnection?.pageInfo?.endCursor);
      updateItemsConnection(last.data);
      console.log('fetched page', i);
    }

    console.log({ itemsConnection });

    client.writeQuery({
      query: FEED_QUERY,
      data: {
        itemsConnection,
      },
    });
  };

  useEffect(() => {
    (async () => {
      // await syncWithServer();
    })();
  }, []);

  const items = allItems.slice(0, pageNum * pageLength);

  const isLastPage = items.length === allItems.length;

  return { items, lastItem, isLastPage };
};
