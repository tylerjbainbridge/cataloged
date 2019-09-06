import { useEffect, useCallback, useRef } from 'react';

export const usePaste = ({ onPaste }: { onPaste: Function }) => {
  const onPasteCallback = useRef((e: any) => {
    if (onPaste) onPaste(e);
  });

  useEffect(() => {
    // @ts-ignore
    document
      .getElementsByTagName('body')[0]
      .addEventListener('paste', onPasteCallback.current);
    return () => {
      // @ts-ignore
      document
        .getElementsByTagName('body')[0]
        .removeEventListener('paste', onPasteCallback.current);
    };
  }, []);
};
