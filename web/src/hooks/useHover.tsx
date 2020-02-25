import { useRef, useState, useEffect } from 'react';

// Hook
export const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        // @ts-ignore
        node.addEventListener('mouseover', handleMouseOver);
        // @ts-ignore
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          // @ts-ignore
          node.removeEventListener('mouseover', handleMouseOver);
          // @ts-ignore
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current], // Recall only if ref changes
  );

  return [ref, value];
};
