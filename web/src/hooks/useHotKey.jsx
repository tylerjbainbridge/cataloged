import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';

const isMousetrapExtended = false;
const _globalCallbacks = {};

export const useHotKey = (keybind, handler, isGlobal = false) => {
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

  const handlerAsCallback = React.useCallback(() => {
    handler();
  }, []);

  useEffect(() => {
    Mousetrap[isGlobal ? 'bindGlobal' : 'bind'](keybind, handlerAsCallback);

    return () => {
      Mousetrap.unbind(keybind);
    };
  }, []);
};
