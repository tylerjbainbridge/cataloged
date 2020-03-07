import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider, CSSReset, theme as t } from '@chakra-ui/core';
import { createGlobalStyle } from 'styled-components';

import favicon from '../images/favicon.png';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: rgba(249, 215, 77, 0.10);
  }
`;

const system = `-apple-system, system-ui, BlinkMacSystemFont, 
'Segoe UI', Roboto, 'Helvetica Neue', 
Ubuntu, Arial, sans-serif;`;

export const theme = {
  ...t,
  fonts: {
    body: system,
    heading: system,
    mono: system,
  },
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
      yellow: {
        main: '#F9D64D',
        // light: '#fffae8',
        // light: '#f7f6f0'
        light: 'rgba(249, 215, 77, 0.05)',
      },
      green: '#70F1B8',
      blue: '#4FB1F6',
    },
    gray: {
      50: '#f7fafc',
      ...t.colors.gray,
    },
  },
};
const description = "Organize what's important to you";
const title = 'Cataloged | A personal knowledge base';
const image =
  'https://collections-file-storage-1.s3.amazonaws.com/assets/logo.png';
const url = 'https://cataloged.co/';
const author = 'Tyler Bainbridge';
const keywords = [
  'personal knowledge base',
  'knowledge base',
  'note taking',
  'file storage',
  'bookmarks',
];

export default ({ children }) => (
  <>
    <Helmet
      link={[{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }]}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : []
      )}
    />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  </>
);
