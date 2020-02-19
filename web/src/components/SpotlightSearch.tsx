import React from 'react';

import { Box } from '@chakra-ui/core';

import MentionExample from './MentionEditor';

export const SpotlightSearch = () => {
  return (
    <Box bg="white" width="100%" height="50px" rounded="lg" p="10px">
      <MentionExample />
    </Box>
  );
};
