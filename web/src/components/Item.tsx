import React, { useContext } from 'react';

import { getItems_items } from './__generated__/getItems';
import { File } from './File';
import { Link } from './Link';
import { SelectContext } from './SelectContainer';
import { Box, Icon } from '@chakra-ui/core';

export const ITEM_INNER_PADDING = 5;
export const ITEM_WIDTH = 305 + ITEM_INNER_PADDING;

export const Item = ({ item }: { item: getItems_items }) => {
  let node = null;

  const { isItemSelected } = useContext(SelectContext);

  switch (item.type) {
    case 'file':
      //@ts-ignore
      node = item.file ? <File item={item} /> : null;
      break;

    default:
      //@ts-ignore
      node = item.link ? <Link item={item} /> : null;
      break;
  }

  return (
    <Box
      d="flex"
      justifyContent="center"
      margin={0}
      width={300}
      maxWidth={300}
      height={380}
      padding={`${ITEM_INNER_PADDING}px`}
    >
      {isItemSelected(item) && (
        <Icon
          name="check-circle"
          position="absolute"
          color="#add8e6"
          size="20"
          padding="10px"
        />
      )}
      {node}
    </Box>
  );
};
