import React, { useContext } from 'react';
import { formatRelative } from 'date-fns';
import _ from 'lodash';

import {
  Box,
  Icon,
  BoxProps,
  Text,
  Tooltip,
  useDisclosure,
  Stack,
} from '@chakra-ui/core';

import { Click } from './Click';
import { SelectContext } from './SelectContainer';
import { useHotKey } from '../hooks/useHotKey';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import {
  ITEM_ACTUAL_WIDTH,
  ITEM_INNER_PADDING,
  ITEM_CONTENT_HEIGHT,
} from './Item';
import { SelectOnClick } from './SelectOnClick';
import { getGenericItemData } from '../util/itemHelpers';
import { LazyImage } from './LazyImage';
import { FeedContext } from './Feed';
import { useGoToItem } from '../hooks/useGoTo';
import { useMedia } from 'react-use';

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

  const baseHoverState = useDisclosure();
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

  const { openItemModal } = useContext(FeedContext);

  const isSelected = isItemSelected(item);

  const itemRef = React.useRef(null);

  const [deleteItem] = useOptimisticDeleteItem(item);

  const [favoriteItem] = useOptimisticUpdateFavoriteManyItems(
    [item],
    !item.isFavorited,
  );

  const deleteHandler = () => {
    if (baseHoverState.isOpen) deleteItem();
  };

  useHotKey('f', favoriteItem, {
    ref: itemRef.current,
    shouldBind: baseHoverState.isOpen,
  });

  useHotKey('d', deleteHandler, {
    ref: itemRef.current,
    shouldBind: baseHoverState.isOpen,
  });

  useHotKey('s', onToggleThunk(item), {
    ref: itemRef.current,
    shouldBind: baseHoverState.isOpen,
  });

  const onOpen = () => openItemModal(item);

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
        d="flex"
        justifyContent="center"
        margin={0}
        width={ITEM_ACTUAL_WIDTH}
        maxWidth={ITEM_ACTUAL_WIDTH}
        height={315}
        padding={`${ITEM_INNER_PADDING}px`}
        userSelect={selectedMap.size ? 'none' : undefined}
      >
        <Stack p="4">
          <Box>
            <Tooltip
              hasArrow
              label="Open"
              aria-label="Open"
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
                {(baseHoverState.isOpen || !!selectedMap.size || isMobile) && (
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
                        border: '5px solid #5718FF',
                      }
                    : {})}
                  {...props}
                >
                  <SelectOnClick {...clickHandlers()}>
                    {clickProps => {
                      switch (item.type) {
                        case 'file':
                          //@ts-ignore
                          if (item.file) {
                            return (
                              <LazyImage
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                hasBorder
                                isReady={item.file.isUploaded}
                                src={
                                  !item.file.isUploaded
                                    ? null
                                    : item.file.squareUrl
                                }
                                {...clickProps}
                              />
                            );
                          }

                        case 'note':
                          if (item.note) {
                            return (
                              <Box
                                d="flex"
                                width="100%"
                                height="100%"
                                rounded="lg"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="gray.50"
                                border="1px solid lightgray"
                                {...clickProps}
                              >
                                <Icon name="edit" size="50px" />
                              </Box>
                            );
                          }

                        case 'link':
                          if (item.link) {
                            const src = item.link.image || item.link.favicon;

                            return src ? (
                              <LazyImage
                                hasBorder
                                src={src}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                shrinkAndCenterThreshold={200}
                                placeholderIcon="external-link"
                                clickProps={clickProps}
                              />
                            ) : (
                              <Box
                                d="flex"
                                width="100%"
                                height="100%"
                                rounded="lg"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="gray.50"
                                {...clickProps}
                              >
                                <Icon name="external-link" size="50px" />
                              </Box>
                            );
                          }

                        case 'googleContact':
                          if (item.googleContact) {
                            return image ? (
                              <LazyImage
                                hasBorder
                                src={image}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                shrinkAndCenterThreshold={200}
                                placeholderIcon="external-link"
                                clickProps={clickProps}
                              />
                            ) : (
                              <Box
                                d="flex"
                                width="100%"
                                height="100%"
                                rounded="lg"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="gray.50"
                                {...clickProps}
                              >
                                {typeof icon === 'string' ? (
                                  // @ts-ignore
                                  <Icon name={icon} size="56px" />
                                ) : (
                                  React.cloneElement(icon, { size: '56px' })
                                )}
                              </Box>
                            );
                          }

                        default:
                          return null;
                      }
                    }}
                  </SelectOnClick>
                </Box>
              </Box>
            </Tooltip>
            <ItemHeader createdAt={createdAt} onSingleClick={action || onOpen}>
              {item.type === 'link' && <Icon name="link" fontSize="s" mr={2} />}
              {title}
            </ItemHeader>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
