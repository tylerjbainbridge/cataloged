import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';

import { usePrevious } from './usePrevious';

export const useHotKey = (keybind, handler, { shouldBind = true } = {}) => {
  const handlerAsCallback = React.useCallback(() => {
    handler();

    return false;
  }, [handler]);

  const prevShouldBind = usePrevious(shouldBind);

  const bind = () => {
    Mousetrap.bind(keybind, e => {
      if (e.stopPropagation) e.stopPropagation();

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }

      handlerAsCallback(e);

      return false;
    });
  };

  const unbind = () => {
    Mousetrap.unbind(keybind);
  };

  useEffect(() => {
    return () => {
      unbind();
    };
  }, []);

  const prevHandler = usePrevious(handler);

  useEffect(() => {
    if (handler !== prevHandler) {
      unbind();
      bind();
    }
  }, [handler]);

  useEffect(() => {
    if (shouldBind) bind();
    else if (!shouldBind && prevShouldBind) unbind();
  }, [shouldBind]);
};
