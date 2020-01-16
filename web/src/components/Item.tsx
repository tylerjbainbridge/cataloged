import React, { useContext } from 'react';
import { formatRelative, format } from 'date-fns';
import _ from 'lodash';
import { FaEllipsisH } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';

import {
  Box,
  Icon,
  Stack,
  BoxProps,
  Text,
  Tooltip,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PseudoBox,
} from '@chakra-ui/core';
import { NoteItem } from './NoteItem';
import { Click } from './Click';
import { FileItem } from './FileItem';
import { LinkItem } from './LinkItem';
import { SelectContext } from './SelectContainer';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';
import { getGenericItemData } from '../util/itemHelpers';
import { LazyImage } from './LazyImage';
import { Labels } from './Labels';

export const ITEM_INNER_PADDING = 5;
export const ITEM_ACTUAL_WIDTH = 270;
export const ITEM_CONTENT_HEIGHT = 200;
export const ITEM_WIDTH = ITEM_ACTUAL_WIDTH + ITEM_INNER_PADDING;

export const Item = ({ item }: { item: ItemFull }) => {
  let node = null;

  const { mode } = useContext(FeedContext);

  if (mode === 'grid') {
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
  }

  return <GenericListItem item={item} />;
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

export const GenericListItem = ({ item }: { item: ItemFull }) => {
  const { title, icon, createdAt, image } = getGenericItemData(item);
  const { mode, openItemModal } = useContext(FeedContext);

  const {
    isItemSelected,
    onSelectRangeThunk,
    onResetAndSelectThunk,
    onToggleThunk,
    selectedMap,
  } = useContext(SelectContext);

  const baseHoverState = useDisclosure();

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

  // List view
  return (
    <LazyLoad height="60px" offset={1000} unmountIfInvisible>
      <Click
        onDoubleClick={debouncedSingleClick => {
          debouncedSingleClick.cancel();
          openItemModal(item);
        }}
        onSingleClick={onResetAndSelectThunk(item)}
        onMetaClick={onToggleThunk(item)}
        onShiftClick={onSelectRangeThunk(item)}
      >
        {clickProps => (
          <PseudoBox
            d="flex"
            width="90%"
            rounded="lg"
            height="50px"
            ref={itemRef}
            onMouseEnter={baseHoverState.onOpen}
            onMouseLeave={baseHoverState.onClose}
            userSelect={selectedMap.size ? 'none' : undefined}
            {...(isItemSelected(item)
              ? {
                  border: `2px solid #5718FF`,
                  backgroundColor: 'rgba(87,24,255, 0.1);',
                }
              : {
                  border: '2px solid lightgray',
                })}
            p="4px"
            mb="10px"
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            _hover={{
              backgroundColor: 'rgba(87,24,255, 0.1);',
              ...(isItemSelected(item)
                ? {
                    border: `2px solid #5718FF`,
                  }
                : {
                    p: '6px',
                    border: 'none',
                  }),
            }}
            {...clickProps}
          >
            <Box d="flex" height="100%" alignItems="center">
              <Box d="flex" height="100%" alignItems="center">
                {image ? (
                  <LazyImage
                    src={image}
                    width="90px"
                    height="100%"
                    objectFit="cover"
                    rounded="lg"
                    placeholderIcon="external-link"
                    spinnerSize="sm"
                  />
                ) : (
                  <Box
                    d="flex"
                    width="90px"
                    height="100%"
                    rounded="lg"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="gray.50"
                  >
                    <Icon name={icon} size="16px" />
                  </Box>
                )}
                <Box
                  ml={5}
                  maxWidth="300px"
                  minWidth="150px"
                  mr={3}
                  isTruncated
                >
                  <Text fontWeight="semibold" maxWidth="100%">
                    {title}
                  </Text>
                </Box>
              </Box>
              <Box
                maxWidth="300px"
                minWidth="150px"
                d="flex"
                height="100%"
                mr={3}
                alignItems="center"
              >
                <Text color="gray.400">
                  {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                </Text>
              </Box>
              <Box
                maxWidth="200px"
                minWidth="100px"
                d="flex"
                height="100%"
                mr={3}
                alignItems="center"
              >
                <Text>{_.upperFirst(item.type)}</Text>
              </Box>

              <Box
                d="flex"
                height="100%"
                maxWidth="200px"
                minWidth="100px"
                alignItems="center"
              >
                <Labels displayOnly item={item} />
              </Box>
            </Box>
            <Box>
              <Popover
                //@ts-ignore
                usePortal
              >
                <PopoverTrigger>
                  <Button
                    cursor="pointer"
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <FaEllipsisH />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="200px" zIndex={4}>
                  <PopoverArrow />
                  <PopoverBody>
                    <Stack spacing={4}>
                      <Button
                        cursor="pointer"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          openItemModal(item);
                        }}
                      >
                        Open
                      </Button>
                      {item.link && (
                        <Button
                          cursor="pointer"
                          as="a"
                          // @ts-ignore
                          href={item.link?.href}
                          target="__blank"
                          rightIcon="external-link"
                        >
                          Visit
                        </Button>
                      )}
                      <Button cursor="pointer" variantColor="red">
                        Delete
                      </Button>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </PseudoBox>
        )}
      </Click>
    </LazyLoad>
  );
};

export const ItemContentContainer = ({
  children,
  tooltip,
  item,
  ...props
}: ItemContentContainer) => {
  const baseHoverState = useDisclosure();
  const menuHoverState = useDisclosure();

  const { isItemSelected, onResetAndSelectThunk, selectedMap } = useContext(
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

  useHotKey('s', onResetAndSelectThunk(item), {
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
        ref={itemRef}
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
                onClick={onResetAndSelectThunk(item)}
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
