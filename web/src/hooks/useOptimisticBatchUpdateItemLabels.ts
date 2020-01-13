import { useMutation } from '@apollo/react-hooks';

import { BATCH_UPDATE_ITEMS_LABELS_MUTATION } from '../graphql/item';
import { useToast } from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';

export const useOptimisticBatchUpdateItemLabels = (
  items: ItemFull[],
  options = {},
) => {
  const toast = useToast();

  const itemIds = items.map(({ id }) => id);

  return useMutation(BATCH_UPDATE_ITEMS_LABELS_MUTATION, {
    variables: { itemIds },
    ...options,
    refetchQueries: ['feed'],
    onCompleted: (...args) => {
      toast({
        title: 'Updated labels',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      // @ts-ignore
      if (options.onCompleted) return options.onCompleted(...args);
    },
  });
};
