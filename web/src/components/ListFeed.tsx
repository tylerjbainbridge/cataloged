import React, { useContext } from 'react';
import { Stack } from '@chakra-ui/core';
import { QueryResult } from '@apollo/client';

import { Item } from './Item';
import { feed } from '../graphql/__generated__/feed';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';

export interface ListFeedProps {
  query: any;
  // QueryResult<feed, Record<string, any>>;
}

export const ListFeed = (_: ListFeedProps) => {
  const { items } = useContext(FeedContext);

  return (
    <Stack d="flex" alignItems="center" width="100%">
      {items.map(item => (
        <Item item={item} key={item.id} />
      ))}
      {/* <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" /> */}
    </Stack>
  );
};
