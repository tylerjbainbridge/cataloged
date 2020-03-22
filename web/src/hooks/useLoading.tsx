import { useState, useEffect } from 'react';
import _ from 'lodash';

import { usePrevious } from './usePrevious';

export const useLoading = ({
  loading,
  data,
  arrayPath,
}: {
  loading: boolean;
  data: any;
  arrayPath: string;
}) => {
  const [isLoading, updateIsLoading] = useState(false);

  const arrayLength = _.get(data, arrayPath, []).length;

  const prev = usePrevious({ loading, data, arrayLength });

  useEffect(() => {
    const currentlyLoading = !prev.loading && loading;
    const doneLoading = prev.loading && !loading;
    // const lengthDifferent =

    // if (!data) {
    //   updateIsLoading(currentlyLoading);
    // }
  });

  return isLoading;
};
