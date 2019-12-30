import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { feed_items, feed_items_link } from './__generated__/feed';
import { ITEM_ACTUAL_WIDTH, ItemHeader } from './Item';

export interface ItemWithLink extends feed_items {
  link: feed_items_link;
}

export const LinkItem = ({ item }: { item: ItemWithLink }) => {
  const { link } = item;

  return (
    <Box maxWidth="100%">
      <SelectOnClick onSingleClick={() => window.open(link.href)} item={item}>
        {clickProps => (
          <LazyImage
            src={link.image || link.favicon || ''}
            width={ITEM_ACTUAL_WIDTH}
            height="200px"
            objectFit="cover"
            {...clickProps}
          />
        )}
      </SelectOnClick>
      <ItemHeader onSingleClick={() => window.open(link.href)}>
        <Icon name="link" fontSize="s" mr={2} /> {link.title || link.href}
      </ItemHeader>
    </Box>
  );
};
