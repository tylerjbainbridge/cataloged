import React, { useContext } from 'react';
import { SimpleGrid, Flex } from '@chakra-ui/core';
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
      <SimpleGrid width="90%" minChildWidth={ITEM_WIDTH} spacing={10}>
        {items.map(item => (
          <Flex justifyContent="center" width="100%">
            <Item item={item} key={item.id} />
          </Flex>
        ))}
        {/* <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" /> */}
      </SimpleGrid>
    </Flex>
  );
};
