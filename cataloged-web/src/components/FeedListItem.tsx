import React, { useContext } from 'react';
import { GenericListItem } from './GenericListItem';
import { FeedContext } from './Feed';
import { SelectContext } from './SelectContainer';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { useGoToItem } from 'cataloged-shared/hooks/useGoTo';
import { getGenericItemData } from 'cataloged-shared/util/itemHelpers';
import { Click } from './Click';

export const FeedListItem = ({ item }: { item: ItemFull }) => {
  const {
    isItemSelected,
    onSelectRangeThunk,
    toggleItem,
    onToggleThunk,
    selectedMap,
    selectRange,
  } = useContext(SelectContext);

  const [goToItem] = useGoToItem();

  const { action } = getGenericItemData(item);

  const { setCursorItemId, isItemCursor } = useContext(FeedContext);
  const isCursorItem = isItemCursor(item);

  const isInSelectMode = !!selectedMap.size;

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
      {(clickProps: any) => (
        <GenericListItem
          selectRange={selectRange}
          isItemSelected={isItemSelected(item)}
          isCursorItem={isCursorItem}
          isInSelectMode={isInSelectMode}
          toggleItem={toggleItem}
          containerProps={{
            ...clickProps,
            userSelect: selectedMap.size ? 'none' : undefined,
            onMouseEnter: () => {
              setCursorItemId(item.id);
            },
          }}
          item={item}
        />
      )}
    </Click>
  );
};
