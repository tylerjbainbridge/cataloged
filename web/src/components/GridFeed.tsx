import React, { useContext } from 'react';
import { SimpleGrid, Flex, Box } from '@chakra-ui/core';
import { QueryResult } from 'react-apollo';

import { ITEM_WIDTH, Item } from './Item';
import { feed } from '../graphql/__generated__/feed';
import { FeedContext } from './Feed';

export interface GridFeedProps {
  query: QueryResult<feed, Record<string, any>>;
}

export const GridFeed = (_: GridFeedProps) => {
  const { items } = useContext(FeedContext);

  return (
    <Flex justifyContent="center">
      <Flex width="90%" flexWrap="wrap">
        {items.map(item => (
          <Flex key={item.id} justifyContent="center" padding="15px">
            <Item item={item} />
          </Flex>
        ))}
        {/* <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" /> */}
      </Flex>
    </Flex>
  );
};
