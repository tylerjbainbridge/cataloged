import { theme as t } from '@chakra-ui/core';

export const theme = {
  ...t,
  colors: {
    ...t.colors,
    brand: {
      pink: '#ED6C7F',
      purple: '#5718FF',
      yellow: '#F9D64D',
      green: '#70F1B8',
      blue: '#4FB1F6',
    },
    gray: {
      50: '#f7fafc',
      ...t.colors.gray,
    },
  },
};
