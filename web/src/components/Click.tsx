import React, { useRef } from 'react';
import { debounce } from 'lodash';

export interface ClickProps {
  children: (args: {
    style: any;
    onClick: Function;
    onDoubleClick: Function;
  }) => any;
  onSingleClick?: Function;
  onDoubleClick?: Function;
  onMetaClick?: Function;
  onShiftClick?: Function;
}

export const Click = (props: ClickProps) => {
  const delay = 200;

  const debouncedSingleClick = useRef(
    debounce(() => {
      if (props.onSingleClick) props.onSingleClick();
    }, delay),
  );

  const onSingleClick = (e: React.MouseEvent) => {
    if (props.onMetaClick && e.metaKey) props.onMetaClick();
    else if (props.onShiftClick && e.shiftKey) props.onShiftClick();
    else debouncedSingleClick.current();
  };

  const onDoubleClick = () => {
    debouncedSingleClick.current.cancel();
    if (props.onDoubleClick) props.onDoubleClick();
  };

  return props.children({
    style: { cursor: 'pointer' },
    onClick: onSingleClick,
    onDoubleClick: onDoubleClick,
  });
};
