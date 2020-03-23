import React, { useContext } from 'react';
import _ from 'lodash';

import { Box, Stack } from '@chakra-ui/core';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';
import { GenericListItem } from './GenericListItem';
import { GenericGridItem } from './GenericGridItem';
import { FeedListItem } from './FeedListItem';

export const GRID_ITEM_INNER_PADDING = 0;
export const GRID_ITEM_ACTUAL_WIDTH = 250;
export const GRID_ITEM_TOP_HEIGHT = 170;
export const GRID_ITEM_BOTTOM_HEIGHT = 150;
export const GRID_ITEM_WIDTH = GRID_ITEM_ACTUAL_WIDTH + GRID_ITEM_INNER_PADDING;
export const GRID_ITEM_HEIGHT = GRID_ITEM_TOP_HEIGHT + GRID_ITEM_BOTTOM_HEIGHT;

export const Item = ({ item }: { item: ItemFull }) => {
  const { mode } = useContext(FeedContext);

  return mode === 'grid' ? (
    <GenericGridItem item={item} />
  ) : (
    <FeedListItem item={item} />
  );
};
