import { useRef } from 'react';
import _ from 'lodash';

export const useDebounce = (func: any, timeMs = 500) => {
  const { current: debouncedFunc } = useRef(_.debounce(func, timeMs));

  return debouncedFunc;
};
