import React, { useRef, MouseEvent } from 'react';
import { debounce } from 'lodash';

export interface ClickProps {
  children: (args: {
    cursor?: 'pointer';
    onClick: any;
    onDoubleClick: () => void;
  }) => any;
  onSingleClick?: () => void;
  onDoubleClick?: () => void;
  onMetaClick?: () => void;
  onShiftClick?: () => void;
}

export const Click = (props: ClickProps) => {
  const delay = 200;

  const debouncedSingleClick = useRef(
    debounce(() => {
      if (props.onSingleClick) props.onSingleClick();
    }, delay),
  );

  const onSingleClick = (event: MouseEvent<any, MouseEvent>) => {
    event.preventDefault();
    if (props.onMetaClick && event.metaKey) props.onMetaClick();
    else if (props.onShiftClick && event.shiftKey) props.onShiftClick();
    else debouncedSingleClick.current();
  };

  const onDoubleClick = () => {
    debouncedSingleClick.current.cancel();
    if (props.onDoubleClick) props.onDoubleClick();
  };

  const hasClickHandler = !!(
    props.onSingleClick ||
    props.onDoubleClick ||
    props.onMetaClick ||
    props.onShiftClick
  );

  return props.children({
    ...(hasClickHandler ? { cursor: 'pointer' } : {}),
    onClick: onSingleClick,
    onDoubleClick: onDoubleClick,
  });
};
