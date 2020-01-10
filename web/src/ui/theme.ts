import { theme as t } from '@chakra-ui/core';

export const theme = {
  ...t,
  colors: {
    ...t.colors,
    gray: {
      50: '#f7fafc',
      ...t.colors.gray,
    },
  },
};
