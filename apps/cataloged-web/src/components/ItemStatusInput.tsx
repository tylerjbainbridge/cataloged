import React, { useState, useEffect } from 'react';

import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { Select, SelectProps } from '@chakra-ui/core';
import { ItemStatus } from 'cataloged-shared/graphql/__generated__/apolloTypes';
import { useOptimisticUpdateStatusManyItems } from 'cataloged-shared/hooks/useOptimisticUpdateStatusManyItems';

export interface ItemStatusInputProps extends SelectProps {
  item: ItemFull;
}

export const ItemStatusInput = ({ item, ...props }: ItemStatusInputProps) => {
  const [selectedStatus, updatedSelectedStatus] = useState<ItemStatus | null>(
    item.status,
  );

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

  return (
    <Select
      cursor="pointer"
      rounded="lg"
      size="sm"
      p="5px"
      value={item.status}
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onChange={(e: any) => {
        e.preventDefault();
        // @ts-ignore
        updatedSelectedStatus(e.target.value);
      }}
      {...props}
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
  );
};
