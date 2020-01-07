import React from 'react';
import { Stack } from '@chakra-ui/core';
import { QueryResult } from 'react-apollo';

import { Item } from './Item';
import { feed } from '../graphql/__generated__/feed';

export interface ListFeedProps {
  query: QueryResult<feed, Record<string, any>>;
}

export const ListFeed = ({ query }: ListFeedProps) => {
  const { data } = query;

  return (
    <Stack>
      {(data?.items || []).map(item => (
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
