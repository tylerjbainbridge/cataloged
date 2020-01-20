import React, { useContext, useState, useEffect } from 'react';
import {
  useDisclosure,
  PseudoBox,
  Box,
  Icon,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  Select,
} from '@chakra-ui/core';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import { format } from 'date-fns';
import { FaEllipsisH } from 'react-icons/fa';

import { ItemFull } from '../graphql/__generated__/ItemFull';
import { getGenericItemData } from '../util/itemHelpers';
import { FeedContext } from './Feed';
import { SelectContext } from './SelectContainer';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { useHotKey } from '../hooks/useHotKey';
import { Click } from './Click';
import { LazyImage } from './LazyImage';
import { Labels } from './Labels';
import { useOptimisticUpdateStatusManyItems } from '../hooks/useOptimisticUpdateStatusManyItems';
import { ItemStatus } from '../graphql/__generated__/apolloTypes';

export const GenericListItem = ({ item }: { item: ItemFull }) => {
  const { openItemModal } = useContext(FeedContext);

  const [selectedStatus, updatedSelectedStatus] = useState<ItemStatus | null>(
    item.status,
  );

  const { title, icon, image } = getGenericItemData(item);

  const [updateStatus] = useOptimisticUpdateStatusManyItems(
    [item],
    selectedStatus,
    {
      // onCompleted: () => updatedSelectedStatus(null),
    },
  );

  useEffect(() => {
    if (selectedStatus && selectedStatus !== item.status) {
      // @ts-ignore
      updateStatus(selectedStatus);
    }
  }, [selectedStatus]);

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

  // List view
  return (
    <LazyLoad height="60px" offset={1000} unmountIfInvisible>
      <Click
        onDoubleClick={(debouncedSingleClick: any) => {
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
                  width={[
                    '150px', // base
                    '250px', // 480px upwards
                    '250px', // 768px upwards
                  ]}
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
            <Box
              d="flex"
              width="200px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Select
                cursor="pointer"
                rounded="lg"
                width="110px"
                size="sm"
                value={item.status}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onChange={(e: any) => {
                  e.preventDefault();
                  // @ts-ignore
                  updatedSelectedStatus(e.target.value);
                }}
              >
                {[
                  ['NOT_STARTED', 'Not started'],
                  ['IN_PROGRESS', 'In progress'],
                  ['DONE', 'Done'],
                ].map(([value, text]) => (
                  <option value={value} key={value}>
                    {text}
                  </option>
                ))}
              </Select>
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
                    <Stack
                      spacing={4}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
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
                      <Button
                        cursor="pointer"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          favoriteItem();
                        }}
                        leftIcon="star"
                      >
                        {item.isFavorited ? 'Remove' : 'Add'}
                      </Button>
                      {item.link && (
                        <Button
                          cursor="pointer"
                          onClick={e => {
                            e.stopPropagation();
                            // @ts-ignore
                            window.open(item.link?.href, '_blank');
                          }}
                          leftIcon="external-link"
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
