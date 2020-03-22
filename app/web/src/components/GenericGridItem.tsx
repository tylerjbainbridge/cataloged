import React, { useContext } from 'react';
import { formatRelative, format } from 'date-fns';
import _ from 'lodash';

import {
  Box,
  Icon,
  BoxProps,
  Text,
  Tooltip,
  useDisclosure,
  Stack,
  Flex,
} from '@chakra-ui/core';

import { Click } from './Click';
import { SelectContext } from './SelectContainer';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import {
  GRID_ITEM_ACTUAL_WIDTH,
  GRID_ITEM_INNER_PADDING,
  GRID_ITEM_TOP_HEIGHT,
  GRID_ITEM_BOTTOM_HEIGHT,
  GRID_ITEM_HEIGHT,
} from './Item';
import { SelectOnClick } from './SelectOnClick';
import { getGenericItemData } from '../util/itemHelpers';
import { LazyImage } from './LazyImage';
import { FeedContext } from './Feed';
import { useGoToItem } from '../hooks/useGoTo';
import { useMedia } from 'react-use';
import { DisplayLabels } from './DisplayLabels';

export const ItemHeader = ({
  children,
  createdAt,
  ...props
}: {
  children: any;
  [k: string]: any;
}) => (
  <Click {...props}>
    {clickProps => (
      <Box {...clickProps} mt={4} ml={1}>
        <Text
          maxWidth={GRID_ITEM_ACTUAL_WIDTH}
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

        <Text>{formatRelative(new Date(createdAt), new Date())}</Text>
      </Box>
    )}
  </Click>
);

interface GenericGridItemProps extends BoxProps {
  item: ItemFull;
}

export const GenericGridItem = ({
  children,
  item,
  ...props
}: GenericGridItemProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const menuHoverState = useDisclosure();

  const {
    title,
    action,
    image,
    createdAt,
    icon,
    subTitle,
  } = getGenericItemData(item);

  const {
    isItemSelected,
    onToggleThunk,
    onResetAndSelectThunk,
    selectedMap,
    toggleItem,
    onSelectRangeThunk,
  } = useContext(SelectContext);

  const [goToItem] = useGoToItem();

  const { setCursorItemId, isItemCursor } = useContext(FeedContext);

  const isSelected = isItemSelected(item);

  const itemRef = React.useRef(null);

  const [deleteItem] = useOptimisticDeleteItem(item);

  const [favoriteItem] = useOptimisticUpdateFavoriteManyItems(
    [item],
    !item.isFavorited,
  );

  const isCursorItem = isItemCursor(item);

  const deleteHandler = () => {
    if (isCursorItem) deleteItem();
  };

  const clickHandlers = (handleAction = true) => ({
    onDoubleClick: (debouncedSingleClick: any) => {
      debouncedSingleClick.cancel();

      if (selectedMap.size && handleAction) {
        goToItem(item);
      }
    },
    onSingleClick: () => {
      if (selectedMap.size || !handleAction) {
        toggleItem(item);
      } else if (handleAction) {
        goToItem(item);
      }
    },
    onMetaClick: handleAction ? action : undefined,
    onShiftClick: onSelectRangeThunk(item),
    item: item,
  });

  return (
    <>
      <Box
        id={`item-${item.id}`}
        d="flex"
        justifyContent="center"
        margin={0}
        width={GRID_ITEM_ACTUAL_WIDTH}
        maxWidth={GRID_ITEM_ACTUAL_WIDTH}
        height={GRID_ITEM_HEIGHT}
        padding={`${GRID_ITEM_INNER_PADDING}px`}
        userSelect={selectedMap.size ? 'none' : undefined}
        boxShadow="rgba(0, 0, 0, 0.08) 0px 1px 4px -2px"
      >
        <Box
          {...(isCursorItem || isItemSelected(item)
            ? {
                backgroundColor: 'rgba(87,24,255, 0.1);',
                rounded: 'lg',
              }
            : {})}
          {...(isItemSelected(item)
            ? {
                border: `2px solid #5718FF`,
                rounded: 'lg',
              }
            : {})}
        >
          <Box
            d="flex"
            justifyContent="center"
            alignContent="center"
            ref={itemRef}
            onMouseEnter={() => setCursorItemId(item.id)}
            // onMouseLeave={() => setCursorItemId(null)}
            position="relative"
            width={GRID_ITEM_ACTUAL_WIDTH}
          >
            {(isCursorItem || !!selectedMap.size || isMobile) && (
              <Box
                d="flex"
                justifyContent="space-between"
                p={2}
                alignItems="center"
                roundedTopRight="lg"
                roundedTopLeft="lg"
                position="absolute"
                top={0}
                height={10}
                width={GRID_ITEM_ACTUAL_WIDTH}
                zIndex={10}
                backgroundColor="lightgrey"
                background="rgb(211,211,211, 0.8);"
                opacity={9}
                // onMouseOver={menuHoverState.onOpen}
                // onMouseLeave={menuHoverState.onClose}
              >
                <SelectOnClick {...clickHandlers(false)}>
                  {clickProps => (
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
                        {...clickProps}
                      />
                    </Tooltip>
                  )}
                </SelectOnClick>

                <Box d="flex" height="100%" alignItems="center">
                  <Tooltip
                    hasArrow
                    label="press f while hovering"
                    aria-label="favorite item"
                    placement="bottom"
                  >
                    <Icon
                      mr="10px"
                      fontSize="15px"
                      name="star"
                      cursor="pointer"
                      aria-label="favorite item"
                      color={item.isFavorited ? 'black' : 'white'}
                      onClick={() => favoriteItem()}
                    />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label="press d then d while hovering"
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
              </Box>
            )}
            <Box
              width={GRID_ITEM_ACTUAL_WIDTH}
              height={GRID_ITEM_TOP_HEIGHT}
              ref={itemRef}
              rounded="lg"
              {...props}
            >
              <SelectOnClick {...clickHandlers()}>
                {clickProps => {
                  const topItemProps: BoxProps = {
                    rounded: 'lg',
                    roundedBottomRight: '0',
                    roundedBottomLeft: '0',
                    border: '1px solid',
                    borderColor: 'gray.100',
                    borderBottom: 'none',
                  };

                  const isReady = item.file ? item.file?.isUploaded : true;
                  const src = item.file
                    ? // @ts-ignore
                      isReady && item.file?.squareUrl
                    : image;

                  const iconNode = (
                    <Box
                      d="flex"
                      width="100%"
                      height="100%"
                      rounded="lg"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="gray.50"
                      {...clickProps}
                      {...topItemProps}
                    >
                      {typeof icon === 'string' ? (
                        // @ts-ignore
                        <Icon name={icon} size="56px" />
                      ) : (
                        React.cloneElement(icon, { size: '56px' })
                      )}
                    </Box>
                  );

                  //@ts-ignore
                  return image ? (
                    <LazyImage
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      hasBorder
                      failureNode={iconNode}
                      isReady={isReady}
                      src={src}
                      shrinkAndCenterThreshold={56}
                      {...clickProps}
                      containerProps={{
                        ...topItemProps,
                      }}
                    />
                  ) : (
                    iconNode
                  );
                }}
              </SelectOnClick>
            </Box>
          </Box>
          <Box
            d="flex"
            justifyContent="space-between"
            flexDirection="column"
            width={GRID_ITEM_ACTUAL_WIDTH}
            height={GRID_ITEM_BOTTOM_HEIGHT}
            border="1px solid"
            borderColor="gray.100"
            borderBottom="none"
            rounded="lg"
            roundedTop="0"
            p="8px"
          >
            <Stack spacing="3px">
              <Text fontSize="md" fontWeight="semibold" isTruncated>
                {title}
              </Text>
              {subTitle && (
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.400"
                  isTruncated
                >
                  {subTitle}
                </Text>
              )}
              {!!item.items.length && (
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.300"
                  isTruncated
                >
                  {item.items.length} related items
                </Text>
              )}
            </Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <DisplayLabels item={item} />
              <Text fontSize="sm" color="gray.400">
                {format(new Date(item.createdAt), 'MM/dd/yyyy')}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};
