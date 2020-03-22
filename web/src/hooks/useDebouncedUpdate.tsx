import { useRef, useEffect } from 'react';
import _ from 'lodash';

import { useDebounce } from './useDebounce';

export const useDebouncedUpdate = (
  mutate: any,
  data: any,
  {
    skipIfEqualTo,
  }: {
    skipIfEqualTo?: any;
  },
) => {
  const debouncedMutate = useDebounce((variables: any) => {
    mutate({ variables });
  }, 500);

  const prevValues = useRef(data);

  useEffect(() => {
    if (
      !_.isEqual(prevValues.current, data) &&
      (!skipIfEqualTo || !_.isEqual(data, skipIfEqualTo))
    ) {
      //@ts-ignore
      debouncedMutate.cancel();
      debouncedMutate(data);
    }

    prevValues.current = data;
  }, [data]);
};
