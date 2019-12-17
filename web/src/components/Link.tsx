import React from 'react';
import { Box } from '@chakra-ui/core';

import { getItems_items_link, getItems_items } from './__generated__/getItems';
import { LazyImage } from './LazyImage';
import { ItemHeader } from './ItemHeader';
import { SelectOnClick } from './SelectOnClick';

export interface ItemWithLink extends getItems_items {
  link: getItems_items_link;
}

export const Link = ({ item }: { item: ItemWithLink }) => {
  const { link } = item;

  return (
    <Box maxWidth="100%">
      <SelectOnClick onSingleClick={() => window.open(link.href)} item={item}>
        {({ style, ...clickProps }) => (
          <LazyImage
            src={link.image || link.favicon || ''}
            size={300}
            objectFit={'cover'}
            objectPosition={'50% 50%'}
            {...style}
            {...clickProps}
          />
        )}
      </SelectOnClick>
      <ItemHeader onSingleClick={() => window.open(link.href)}>
        {link.title || 'link.href'}
      </ItemHeader>
    </Box>
  );
};
