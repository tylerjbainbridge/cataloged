import React from 'react';
import {
  Box,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/core';
import { format } from 'date-fns';

import { ItemFull } from '../graphql/__generated__/ItemFull';

export interface ItemDrawerMeta {
  item: ItemFull;
  children?: any;
}

export const ItemDrawerMeta = ({ item, children = null }: ItemDrawerMeta) => {
  return (
    <Stack spacing="20px">
      {children}
      <Stat>
        <StatLabel>
          {item.type === 'googleContact' ? 'Updated' : 'Created'}
        </StatLabel>
        <StatNumber>{format(new Date(item.date), 'MMM dd, yyyy')}</StatNumber>
      </Stat>
      {/* <Stat>
        <StatLabel>Updated</StatLabel>
        <StatNumber>
          {format(new Date(item.updatedAt), "MMM dd, yyyy 'at' h:mm:ss aaaa")}
        </StatNumber>
      </Stat> */}
    </Stack>
  );
};
