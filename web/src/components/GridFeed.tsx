import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/core';
import { QueryResult } from 'react-apollo';

import { ITEM_WIDTH, Item } from './Item';
import { feed } from '../graphql/__generated__/feed';

export interface GridFeedProps {
  query: QueryResult<feed, Record<string, any>>;
  nextPage: Function;
}

export const GridFeed = ({ query, nextPage }: GridFeedProps) => {
  const { data } = query;

  return (
    <SimpleGrid minChildWidth={ITEM_WIDTH} spacing={10}>
      {(data?.items || []).map(item => (
        <Item item={item} key={item.id} />
      ))}
      {/* <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" /> */}
    </SimpleGrid>
  );
};
