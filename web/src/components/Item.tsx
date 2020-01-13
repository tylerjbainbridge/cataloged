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
import { Click } from './Click';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { ItemFull } from '../graphql/__generated__/ItemFull';

export const ITEM_INNER_PADDING = 5;
export const ITEM_ACTUAL_WIDTH = 270;
export const ITEM_CONTENT_HEIGHT = 200;
export const ITEM_WIDTH = ITEM_ACTUAL_WIDTH + ITEM_INNER_PADDING;

export const Item = ({ item }: { item: ItemFull }) => {
  let node = null;

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
        <Box>{node}</Box>
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
  item: ItemFull;
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
  item: ItemFull;
}

export const ItemContentContainer = ({
  children,
  tooltip,
  item,
  ...props
}: ItemContentContainer) => {
  const baseHoverState = useDisclosure();
  const menuHoverState = useDisclosure();

  const { isItemSelected, selectedMap, onToggleThunk } = useContext(
    SelectContext,
  );

  const isSelected = isItemSelected(item);

  const itemRef = React.useRef(null);

  const [deleteItem] = useOptimisticDeleteItem(item);

  const deleteHandler = () => {
    if (baseHoverState.isOpen) deleteItem();
  };

  useHotKey('d', deleteHandler, {
    ref: itemRef.current,
    shouldBind: baseHoverState.isOpen,
  });

  useHotKey('s', onToggleThunk(item), {
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
        d="flex"
        justifyContent="center"
        alignContent="center"
        onMouseEnter={baseHoverState.onOpen}
        onMouseLeave={baseHoverState.onClose}
        position="relative"
      >
        {(baseHoverState.isOpen || !!selectedMap.size) && (
          <Box
            d="flex"
            justifyContent="space-between"
            p={2}
            alignItems="center"
            roundedBottomRight="lg"
            roundedBottomLeft="lg"
            position="absolute"
            bottom={0}
            height={10}
            width={ITEM_ACTUAL_WIDTH}
            zIndex={1}
            backgroundColor="lightgrey"
            background="rgb(211,211,211, 0.8);"
            opacity={9}
            onMouseOver={menuHoverState.onOpen}
            onMouseLeave={menuHoverState.onClose}
          >
            <Tooltip
              hasArrow
              aria-label="select item"
              label="press s while hovering to toggle"
              placement="bottom"
            >
              <Icon
                fontSize="15px"
                name="check-circle"
                cursor="pointer"
                aria-label="select item"
                color={isSelected ? 'black' : 'white'}
                onClick={onToggleThunk(item)}
              />
            </Tooltip>
            <Tooltip
              hasArrow
              label="press d while hovering"
              aria-label="delete item"
              placement="bottom"
            >
              <Icon
                fontSize="15px"
                name="delete"
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
          rounded="lg"
          {...(isSelected
            ? {
                padding: 3,
                border: '5px solid lightblue',
              }
            : {})}
          {...props}
        >
          {children}
        </Box>
      </Box>
    </Tooltip>
  );
};
