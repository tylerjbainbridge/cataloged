import React, { useState } from 'react';

import { Box, Code } from '@chakra-ui/core';

import FilterSearchInput from './FilterSearchInput';
import { getQueryStringFromFilters } from '../util/helpers';

export const FilterInputPlayground = () => {
  const [filters, setFilters] = useState([]);

  return (
    <Box d="flex" flexWrap="wrap" width="100%">
      <Box bg="white" width="100%" height="50px" rounded="lg" p="10px">
        <FilterSearchInput onChange={(filters: any) => setFilters(filters)} />
      </Box>
      <Box>
        <Code>{getQueryStringFromFilters(filters)}</Code>
        <br />
        <Code>{JSON.stringify(filters, null, 4)}</Code>
      </Box>
    </Box>
  );
};
