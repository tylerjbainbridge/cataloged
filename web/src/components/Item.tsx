import React, { useContext } from 'react';
import { formatRelative } from 'date-fns';
import _ from 'lodash';

import { FileItem } from './FileItem';
import { LinkItem } from './LinkItem';
import { SelectContext } from './SelectContainer';
import {
  Box,
  Icon,
  Stack,
  BoxProps,
  Text,
  Tooltip,
  useDisclosure,
  IconButton,
} from '@chakra-ui/core';
import { NoteItem } from './NoteItem';
import { feed_items } from './__generated__/feed';
import { Click } from './Click';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';

export const ITEM_INNER_PADDING = 5;
export const ITEM_ACTUAL_WIDTH = 270;
export const ITEM_CONTENT_HEIGHT = 200;
export const ITEM_WIDTH = ITEM_ACTUAL_WIDTH + ITEM_INNER_PADDING;

export const Item = ({ item }: { item: feed_items }) => {
  let node = null;

  const { isItemSelected } = useContext(SelectContext);

  switch (item.type) {
    case 'file':
      //@ts-ignore
      node = item.file ? <FileItem item={item} /> : null;
      break;

    case 'note':
      //@ts-ignore
      node = item.note && item.note.text ? <NoteItem item={item} /> : null;
      break;

    case 'link':
      //@ts-ignore
      node = item.link ? <LinkItem item={item} /> : null;
      break;

    default:
      //@ts-ignore
      node = null;
      break;
  }

  if (!node) return null;

  return (
    <Box
      d="flex"
      justifyContent="center"
      margin={0}
      width={ITEM_ACTUAL_WIDTH}
      maxWidth={ITEM_ACTUAL_WIDTH}
      height={315}
      padding={`${ITEM_INNER_PADDING}px`}
    >
      <Stack p="4">
        <Box>
          {isItemSelected(item) && false && (
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
        {/* <Labels item={item} canAddLabels={false} /> */}
      </Stack>
    </Box>
  );
};

export const ItemHeader = ({
  children,
  item,
  ...props
}: {
  children: any;
  item: feed_items;
  [k: string]: any;
}) => (
  <Click {...props}>
    {clickProps => (
      <Box {...clickProps} mt={4} ml={1}>
        <Text
          maxWidth={ITEM_ACTUAL_WIDTH}
          fontSize="lg"
          fontWeight="bold"
          whiteSpace="nowrap"
          overflow="hidden"
          style={{
            textOverflow: 'ellipsis',
          }}
          mb={3}
        >
          {children}
        </Text>

        <Text>{formatRelative(new Date(item.createdAt), new Date())}</Text>
      </Box>
    )}
  </Click>
);

interface ItemContentContainer extends BoxProps {
  tooltip: string;
  item: feed_items;
}

export const ItemContentContainer = ({
  children,
  tooltip,
  item,
  ...props
}: ItemContentContainer) => {
  const baseHoverState = useDisclosure();
  const menuHoverState = useDisclosure();

  const itemRef = React.useRef(null);

  const [deleteItem] = useOptimisticDeleteItem(item);

  const hotKeyHandler = () => {
    if (baseHoverState.isOpen) deleteItem();
  };

  useHotKey('d', hotKeyHandler, {
    ref: itemRef.current,
    shouldBind: baseHoverState.isOpen,
  });

  return (
    <Tooltip
      hasArrow
      label={tooltip}
      aria-label={tooltip}
      placement="top"
      maxWidth={200}
      isOpen={baseHoverState.isOpen && !menuHoverState.isOpen}
      onOpen={baseHoverState.onOpen}
    >
      <Box
        onMouseEnter={baseHoverState.onOpen}
        onMouseLeave={baseHoverState.onClose}
        position="relative"
      >
        {baseHoverState.isOpen && (
          <Box
            d="flex"
            justifyContent="flex-end"
            p={2}
            alignItems="center"
            roundedBottomRight="lg"
            roundedBottomLeft="lg"
            position="absolute"
            bottom={0}
            height={10}
            width={ITEM_ACTUAL_WIDTH}
            zIndex={10}
            backgroundColor="lightgrey"
            background="rgb(211,211,211, 0.8);"
            opacity={9}
            onMouseOver={menuHoverState.onOpen}
            onMouseLeave={menuHoverState.onClose}
          >
            <Tooltip
              hasArrow
              label="press d while hovering over the item"
              aria-label="delete item"
              placement="bottom"
            >
              <IconButton
                size="sm"
                icon="delete"
                cursor="pointer"
                aria-label="delete item"
                onClick={() => deleteItem()}
              />
            </Tooltip>
          </Box>
        )}
        <Box
          width={ITEM_ACTUAL_WIDTH}
          height={ITEM_CONTENT_HEIGHT}
          ref={itemRef}
          {...props}
        >
          {children}
        </Box>
      </Box>
    </Tooltip>
  );
};
