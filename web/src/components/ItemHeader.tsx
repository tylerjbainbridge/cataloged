import React from 'react';
import { Click } from './Click';

import { Text, Box } from '@chakra-ui/core';

export const ItemHeader = ({
  children,
  ...props
}: {
  children: any;
  [k: string]: any;
}) => (
  <Click {...props}>
    {clickProps => (
      <Box {...clickProps} marginTop={5}>
        <Text isTruncated maxHeight="100%" fontSize="lg" fontWeight="bold">
          {children}
        </Text>
      </Box>
    )}
  </Click>
);
