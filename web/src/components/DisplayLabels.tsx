import React, { useState, useRef, useEffect, useContext } from 'react';
import FocusLock from 'react-focus-lock';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import {
  Input,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  InputRightElement,
  FormControl,
  Icon,
  Stack,
  TagIcon,
  TagLabel,
  Button,
  InputGroup,
  useDisclosure,
  PseudoBox,
  Switch,
  Box,
  Text,
} from '@chakra-ui/core';

import color from 'color';

import { useAuth } from '../hooks/useAuth';
import { theme } from '../styles/theme';
import { FaTimesCircle, FaRegTimesCircle, FaTimes } from 'react-icons/fa';
import { useOptimisticBatchUpdateItemLabels } from '../hooks/useOptimisticBatchUpdateItemLabels';

export const ITEM_LABEL_RESPONSE_FRAGMENT = gql`
  fragment ItemLabelResponseFragment on Item {
    id

    labels {
      id
      name
    }
  }
`;

export const CONNECT_LABEL_TO_ITEM_MUTATION = gql`
  mutation connectLabelToItem($name: String!, $itemId: String!) {
    connectLabelToItem(name: $name, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

export const DISCONNECT_LABEL_FROM_ITEM_MUTATION = gql`
  mutation disconnectLabelFromItem($labelId: String!, $itemId: String!) {
    disconnectLabelFromItem(labelId: $labelId, itemId: $itemId) {
      ...ItemLabelResponseFragment
    }
  }

  ${ITEM_LABEL_RESPONSE_FRAGMENT}
`;

export const CREATE_LABEL_MUTATION = gql`
  mutation createLabel($name: String!) {
    createLabel(name: $name) {
      # user
      id

      labels {
        id
        name
      }
    }
  }
`;

export const DisplayLabels = ({
  item = null,
  showSelectedLabels = true,
  displayOnly = false,
  numDisplayLabels = 1,
}: {
  item?: any;
  selectedLabels?: any[];
  canAddLabels?: boolean;
  onSelectedLabelChange?: Function;
  showSelectedLabels?: boolean;
  trigger?: JSX.Element | null;
  displayOnly?: boolean;
  onApply?: (labels: any[]) => any;
  numDisplayLabels?: number;
}) => {
  const [disconnectLabelFromItem] = useMutation(
    DISCONNECT_LABEL_FROM_ITEM_MUTATION,
  );

  const [batchUpdate] = useOptimisticBatchUpdateItemLabels([item]);

  const labelSet = _.orderBy(item.labels, 'name', 'desc');

  const removeAction = ({ id }: { id: string; name: string }) => {
    batchUpdate({
      labelIdsToRemove: [id],
    });
  };

  const labelNodes = labelSet.map(
    ({ id, name }: { id: string; name: string }) => (
      <Tag
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        minWidth="auto"
        size="sm"
        key={name}
        m={1}
      >
        <TagLabel>{name}</TagLabel>
        <FaTimes
          size="12px"
          cursor="pointer"
          style={{ marginLeft: '3px' }}
          onClick={e => {
            e.stopPropagation();
            removeAction({ id, name });
          }}
        />
      </Tag>
    ),
  );

  return (
    <Box
      d="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      // height="40px"
    >
      <Box
        d="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        maxWidth="100%"
      >
        {showSelectedLabels && (
          <>
            <Box
              d="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              height="100%"
              overflowY="hidden"
              overflowX="hidden"
              flexWrap="wrap"
              maxWidth="100%"
            >
              {labelNodes.length
                ? _.take(labelNodes, numDisplayLabels)
                : null && (
                    <Text
                      ml={2}
                      fontSize="sm"
                      verticalAlign="center"
                      // color={labelProps.color}
                    >
                      No labels
                    </Text>
                  )}
            </Box>
            {labelNodes.length > numDisplayLabels && (
              <Popover trigger="hover" placement="bottom-start" closeOnBlur>
                <PopoverTrigger>
                  <Box>
                    <Tag
                      mt={1}
                      cursor="pointer"
                      minWidth="auto"
                      size="sm"
                      mr={2}
                    >
                      <TagLabel>...</TagLabel>
                    </Tag>
                  </Box>
                </PopoverTrigger>
                <PopoverContent zIndex={100} width="200px" p={3}>
                  <Box>{labelNodes}</Box>
                </PopoverContent>
              </Popover>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
