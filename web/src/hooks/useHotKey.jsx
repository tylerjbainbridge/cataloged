import React, { useEffect } from 'react';
import hotkeys from 'hotkeys-js';
import { usePrevious } from './usePrevious';

export const useHotKey = (keybind, handler, { shouldBind = true } = {}) => {
  const handlerAsCallback = React.useCallback(() => {
    handler();

    return false;
  }, [handler]);

  const prevShouldBind = usePrevious(shouldBind);

  const bind = () => {
    hotkeys(keybind, e => {
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
    hotkeys.unbind(keybind);
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
