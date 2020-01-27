import React, { useRef, MouseEvent, useCallback } from 'react';
import { debounce } from 'lodash';
import { useHotKey } from '../hooks/useHotKey';

export interface ClickProps {
  children: (args: {
    cursor?: 'pointer';
    onClick: any;
    onTouchStart: any;
    onDoubleClick: () => void;
  }) => any;
  onSingleClick?: () => void;
  onTouchStart?: () => void;
  onDoubleClick?: any | ((debouncedSingleClick: any) => void);
  onMetaClick?: any | ((debouncedSingleClick: any) => void);
  onShiftClick?: any | ((debouncedSingleClick: any) => void);
}

export const Click = (props: ClickProps) => {
  const delay = 200;

  const handleSingleClick = useRef(props.onSingleClick);

  handleSingleClick.current = props.onSingleClick;

  const { current: debouncedSingleClick } = useRef(
    debounce(() => {
      if (handleSingleClick.current) handleSingleClick.current();
    }, delay),
  );

  const onSingleClick = useCallback(
    (event: MouseEvent<any, MouseEvent>) => {
      event.preventDefault();
      if (props.onMetaClick && event.metaKey)
        props.onMetaClick(debouncedSingleClick);
      else if (props.onShiftClick && event.shiftKey)
        props.onShiftClick(debouncedSingleClick);
      else debouncedSingleClick();
    },
    [props],
  );

  const onDoubleClick = () => {
    debouncedSingleClick.cancel();
    if (props.onDoubleClick) props.onDoubleClick(debouncedSingleClick);
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
    onTouchStart: onSingleClick,
    onDoubleClick: onDoubleClick,
  });
};
