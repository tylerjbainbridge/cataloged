import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { Box } from '@chakra-ui/core';

import { gql } from 'apollo-boost';
import { ITEM_FULL_FRAGMENT } from 'cataloged-shared/graphql/item';
import { useQuery } from '@apollo/client';
import { COLLECTION_FULL_FRAGMENT } from 'cataloged-shared/graphql/collection';

export const CollectonPlayground = ({ items }: any) => {
  return (
    <Box d="flex" flexWrap="wrap" width="100%">
      <Box bg="white" width="100%" height="50px" rounded="lg" p="10px"></Box>
    </Box>
  );
};
