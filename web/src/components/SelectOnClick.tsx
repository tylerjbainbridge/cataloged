import React, { useContext } from 'react';

import { Click, ClickProps } from './Click';
import { SelectContext } from './SelectContainer';

export interface SelectOnClickProps extends ClickProps {
  item: { id: string; [key: string]: any };
}

export const SelectOnClick = ({
  item,
  children,
  ...props
}: SelectOnClickProps) => {
  const {
    onToggleThunk,
    onSelectRangeThunk,
    onResetAndSelectThunk,
  } = useContext(SelectContext);

  return (
    <Click
      // onSingleClick={on(item)}
      onMetaClick={onToggleThunk(item)}
      onShiftClick={onSelectRangeThunk(item)}
      {...props}
    >
      {children}
    </Click>
  );
};
