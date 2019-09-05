import { useEffect } from 'react';

export const usePaste = ({ onPaste }: { onPaste: Function }) => {
  useEffect(() => {
    // @ts-ignore
    document.addEventListener('paste', onPaste);
    return () => {
      // @ts-ignore
      document.removeEventListener('paste', onPaste);
    };
  }, []);
};
