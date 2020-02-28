import React, { useContext } from 'react';
import {
  useDisclosure,
  PseudoBox,
  Box,
  Icon,
  Text,
  MenuItem,
  ControlBox,
  VisuallyHidden,
  Input,
} from '@chakra-ui/core';
import _ from 'lodash';

// @ts-ignore
import LazyLoad from 'react-lazy-load';
import { format } from 'date-fns';
import { FaExpandArrowsAlt } from 'react-icons/fa';

import { ItemFull } from '../graphql/__generated__/ItemFull';
import { getGenericItemData } from '../util/itemHelpers';
import { SelectContext } from './SelectContainer';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { useHotKey } from '../hooks/useHotKey';
import { Click } from './Click';
import { LazyImage } from './LazyImage';
import { Labels } from './Labels';
import { useMedia } from 'react-use';
import { useGoToItem } from '../hooks/useGoTo';
import { ItemActionMenu } from './ItemActionMenu';
import { FeedContext } from './Feed';

export const GenericListItem = ({ item }: { item: ItemFull }) => {
  const isMobile = useMedia('(max-width: 768px)');

  const [goToItem] = useGoToItem();

  const {
    title,
    subTitle,
    icon,
    image,
    compressedImage,
    action,
    displayType,
    type,
  } = getGenericItemData(item);

  const {
    isItemSelected,
    onSelectRangeThunk,
    toggleItem,
    onToggleThunk,
    selectedMap,
    selectRange,
  } = useContext(SelectContext);

  const { setCursorItemId, isItemCursor } = useContext(FeedContext);

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

  // List view
  return (
    <Click
      onDoubleClick={(debouncedSingleClick: any) => {
        debouncedSingleClick.cancel();

        if (selectedMap.size) {
          goToItem(item);
        }
      }}
      onSingleClick={() => {
        if (selectedMap.size) {
          toggleItem(item);
        } else {
          goToItem(item);
        }
      }}
      onMetaClick={() => {
        if (selectedMap.size) {
          toggleItem(item);
        } else if (action) {
          action();
        }
      }}
      onShiftClick={onSelectRangeThunk(item)}
    >
      {clickProps => (
        <Box
          id={`item-${item.id}`}
          d="flex"
          width="100%"
          userSelect={selectedMap.size ? 'none' : undefined}
          {...clickProps}
          onMouseEnter={() => {
            setCursorItemId(item.id);
          }}
          onMouseLeave={() => {
            // setCursorItemId(null);
          }}
        >
          <LazyLoad
            height="60px"
            width="100%"
            offsetBottom={1000}
            // key={item.id}
          >
            <PseudoBox
              d="flex"
              // flexWrap="wrap"
              width="100%"
              height="50px"
              rounded="lg"
              ref={itemRef}
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
              {...(isCursorItem
                ? {
                    backgroundColor: 'rgba(87,24,255, 0.1);',
                    ...(isItemSelected(item)
                      ? {
                          border: `2px solid #5718FF`,
                        }
                      : {
                          p: '6px',
                          border: 'none',
                        }),
                  }
                : {})}
            >
              <Box
                d="flex"
                alignItems="center"
                width="40px"
                height="60px"
                position="absolute"
                marginLeft="-40px"
              >
                {(isCursorItem ||
                  isItemSelected(item) ||
                  !!selectedMap.size) && (
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      console.log('click', item.id, selectedMap.size);

                      if (e.shiftKey) {
                        selectRange(item);
                      } else {
                        toggleItem(item);
                      }
                    }}
                  >
                    <label>
                      <input
                        style={{ display: 'none' }}
                        type="checkbox"
                        checked={isItemSelected(item)}
                        value={isItemSelected(item)}
                        defaultChecked={isItemSelected(item)}
                      />
                      <ControlBox
                        cursor="pointer"
                        borderWidth="1px"
                        size="20px"
                        rounded="lg"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                        _checked={{
                          bg: 'brand.purple.main',
                          color: 'white',
                          borderColor: 'brand.purple.main',
                        }}
                        _focus={{
                          borderColor: 'green.600',
                          boxShadow: 'outline',
                        }}
                      >
                        <Icon name="check" size="16px" />
                      </ControlBox>
                    </label>
                  </Box>
                )}
              </Box>
              <Box d="flex" height="100%" alignItems="center">
                <Box d="flex" height="100%" alignItems="center">
                  {image || compressedImage ? (
                    <LazyImage
                      hasBorder
                      src={compressedImage || image}
                      width={isMobile ? '50px' : '90px'}
                      height="100%"
                      objectFit="cover"
                      rounded="lg"
                      placeholderIcon="external-link"
                      spinnerSize="sm"
                    />
                  ) : (
                    <Box
                      d="flex"
                      width={isMobile ? '50px' : '90px'}
                      height="100%"
                      rounded="lg"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="gray.50"
                      border="1px solid lightgray"
                    >
                      {typeof icon === 'string' ? (
                        // @ts-ignore
                        <Icon name={icon} size="16px" />
                      ) : (
                        React.cloneElement(icon, { size: '16px' })
                      )}
                    </Box>
                  )}
                  <Box
                    ml={5}
                    width={isMobile ? '100px' : '350px'}
                    mr="15px"
                    isTruncated
                  >
                    <Text fontWeight="semibold" maxWidth="100%">
                      {title}{' '}
                      {subTitle && (
                        <Text fontWeight="lighter" color="gray.500">
                          {subTitle}
                        </Text>
                      )}
                    </Text>
                  </Box>
                </Box>
                {!isMobile && (
                  <>
                    <Box d="flex" height="100%" mr="100px" alignItems="center">
                      <Text color="gray.400">
                        {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                      </Text>
                    </Box>
                    <Box
                      d="flex"
                      height="100%"
                      width="100px"
                      mr="100px"
                      alignItems="center"
                    >
                      <Text>{displayType || type}</Text>
                    </Box>
                    <Box
                      d="flex"
                      height="100%"
                      maxWidth="200px"
                      minWidth="100px"
                      alignItems="center"
                    >
                      <Labels item={item} />
                    </Box>
                  </>
                )}
              </Box>
              <Box>
                {/* {item.link && (
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
                      )} */}

                <ItemActionMenu item={item}>
                  {menuNodes => (
                    <>
                      <MenuItem
                        onClick={(e: any) => {
                          e.stopPropagation();
                          toggleItem(item);
                        }}
                      >
                        {isItemSelected(item) ? 'Deselect' : 'Select'}
                      </MenuItem>
                      <MenuItem
                        onClick={(e: any) => {
                          goToItem(item);
                        }}
                      >
                        <FaExpandArrowsAlt
                          size="13px"
                          style={{ marginRight: '5px' }}
                        />{' '}
                        Open
                      </MenuItem>
                      {item.link && (
                        <MenuItem
                          d="flex"
                          alignItems="center"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            // @ts-ignore
                            window.open(item.link?.href, '_blank');
                          }}
                        >
                          <Icon name="external-link" fontSize="11px" mr="5px" />{' '}
                          Visit
                        </MenuItem>
                      )}
                      {Object.values(menuNodes)}
                    </>
                  )}
                </ItemActionMenu>
              </Box>
            </PseudoBox>
          </LazyLoad>
        </Box>
      )}
    </Click>
  );
};
