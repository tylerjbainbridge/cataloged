import { theme as t } from '@chakra-ui/core';

export const theme = {
  ...t,
  colors: {
    ...t.colors,
    brand: {
      pink: {
        main: '#ED6C7F',
        light: '#faebed',
        dark: '#eddfe1',
      },
      purple: {
        main: '#5718FF',
        light: '#F9F5FE',
        dark: '#e8e4ed',
      },
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
