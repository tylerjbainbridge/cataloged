import React, { useState, useContext } from 'react';
import { FeedContext } from './Feed';

export const SelectContext = React.createContext<{ [key: string]: any }>({});

export interface SelectContainerProps {
  children: any;
  items?: { id: string; [key: string]: any }[];
  getId?: Function;
  initialSelectedMap?: Map<string, any>;
}

export interface Item {
  [key: string]: any;
}

export const SelectContainer = ({
  children,
  initialSelectedMap = new Map(),
  getId = ({ id }: { id: string }) => id,
}: SelectContainerProps) => {
  const { items } = useContext(FeedContext);

  const [selectedMap, updateSelectedMap] = useState(initialSelectedMap);

  const immutableUpdateMap = (map: Map<any, any>) =>
    updateSelectedMap(new Map(map.entries()));

  const isItemSelected = (item: Item) => {
    const id = getId(item);
    return selectedMap.has(id);
  };

  const selectItem = (item: Item) => {
    const id = getId(item);
    selectedMap.set(id, item);
    immutableUpdateMap(selectedMap);
  };

  const resetAndSelect = (item: Item) => {
    const newSelectedMap = new Map();
    const id = getId(item);
    newSelectedMap.set(id, item);
    immutableUpdateMap(newSelectedMap);
  };

  const selectRange = (newItem: Item) => {
    if (!items) return;

    const lastItem = Array.from(selectedMap.values())[selectedMap.size - 1];

    const lastItemIdx = items.findIndex(
      (elem: Item) => getId(elem) === getId(lastItem),
    );

    const newItemIdx = items.findIndex(
      (elem: Item) => getId(elem) === getId(newItem),
    );

    const [startIdx, endIdx] =
      lastItemIdx > newItemIdx
        ? [newItemIdx, lastItemIdx]
        : [lastItemIdx, newItemIdx];

    [newItem, ...items.slice(startIdx, endIdx)].forEach((item: Item) => {
      const id = getId(item);
      selectedMap.set(id, item);
    });

    immutableUpdateMap(selectedMap);
  };

  const deselectItem = (item: Item) => {
    const id = getId(item);
    selectedMap.delete(id);
    immutableUpdateMap(selectedMap);
  };

  const toggleItem = (item: Item) => {
    if (isItemSelected(item)) deselectItem(item);
    else selectItem(item);
  };

  const onToggleThunk = (item: Item) => () => toggleItem(item);
  const onSelectRangeThunk = (item: Item) => () => selectRange(item);
  const onResetAndSelectThunk = (item: Item) => () => {
    if (isItemSelected(item)) return immutableUpdateMap(new Map());
    return resetAndSelect(item);
  };

  const deselectAllItems = () => immutableUpdateMap(new Map());

  return (
    <SelectContext.Provider
      value={{
        selectedMap,
        selectedItems: items.filter(item => selectedMap.has(item.id)),
        isItemSelected,
        selectItem,
        deselectItem,
        toggleItem,
        onToggleThunk,
        onSelectRangeThunk,
        onResetAndSelectThunk,
        deselectAllItems,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
