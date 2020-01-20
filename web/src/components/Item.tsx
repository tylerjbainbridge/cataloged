import React, { useContext } from 'react';
import _ from 'lodash';

import { Box, Stack } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';
import { GenericListItem } from './GenericListItem';
import { GenericGridItem } from './GenericGridItem';

export const ITEM_INNER_PADDING = 5;
export const ITEM_ACTUAL_WIDTH = 270;
export const ITEM_CONTENT_HEIGHT = 200;
export const ITEM_WIDTH = ITEM_ACTUAL_WIDTH + ITEM_INNER_PADDING;

export const Item = ({ item }: { item: ItemFull }) => {
  const { mode } = useContext(FeedContext);

  return mode === 'grid' ? (
    <GenericGridItem item={item} />
  ) : (
    <GenericListItem item={item} />
  );
};
