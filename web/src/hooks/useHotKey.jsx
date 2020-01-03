import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';
import { usePrevious } from './usePrevious';

const isMousetrapExtended = false;
const _globalCallbacks = {};

export const useHotKey = (
  keybind,
  handler,
  { isGlobal = false, shouldBind = true, ref = null } = {},
) => {
  useEffect(() => {
    if (!isMousetrapExtended) {
      // Took this code from the janky mouse trap docs
      (function(Mousetrap) {
        var _originalStopCallback = Mousetrap.prototype.stopCallback;

        // @ts-ignore

        Mousetrap.prototype.stopCallback = function(
          e,
          element,
          combo,
          sequence,
        ) {
          var self = this;

          if (self.paused) {
            return true;
          }

          // @ts-ignore
          if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
            return false;
          }

          return _originalStopCallback.call(self, e, element, combo);
        };

        // @ts-ignore
        Mousetrap.prototype.bindGlobal = function(keys, callback, action) {
          var self = this;
          self.bind(keys, callback, action);

          if (keys instanceof Array) {
            for (var i = 0; i < keys.length; i++) {
              // @ts-ignore

              _globalCallbacks[keys[i]] = true;
            }
            return;
          }
          // @ts-ignore

          _globalCallbacks[keys] = true;
        };

        Mousetrap.init();
      })(Mousetrap);
    }
  }, []);

  const handlerAsCallback = React.useCallback(
    e => {
      if (e.preventDefault) e.preventDefault();
      handler();
    },
    [handler],
  );

  const { current: mousetrap } = React.useRef(
    // ref ? new Mousetrap(ref) :
    Mousetrap,
  );

  const prevShouldBind = usePrevious(shouldBind);

  const bind = () => {
    mousetrap[isGlobal ? 'bindGlobal' : 'bind'](keybind, handlerAsCallback);
  };

  const unbind = () => {
    mousetrap.unbind(keybind);
  };

  useEffect(() => {
    return () => {
      unbind();
    };
  }, []);

  useEffect(() => {
    if (shouldBind) bind();
    else if (!shouldBind && prevShouldBind) unbind();
  }, [shouldBind]);
};
