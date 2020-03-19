import React, { useContext } from 'react';
import { SimpleGrid, Flex, Box } from '@chakra-ui/core';
import { QueryResult } from '@apollo/client';

import { GRID_ITEM_WIDTH, Item } from './Item';
import { feed } from '../graphql/__generated__/feed';
import { FeedContext } from './Feed';

export interface GridFeedProps {
  query?: any;
  //  QueryResult<feed, Record<string, any>>;
}

export const GridFeed = (_: GridFeedProps) => {
  const { items } = useContext(FeedContext);

  return (
    <Flex justifyContent="center">
      <Flex maxWidth="1150px" flexWrap="wrap" justifyContent="center">
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
