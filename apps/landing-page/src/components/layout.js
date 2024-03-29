import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { window } from 'browser-monads';

import { ThemeProvider, CSSReset, theme as t } from '@chakra-ui/core';
import { createGlobalStyle } from 'styled-components';
import ApolloClient from 'apollo-boost';

import favicon from '../images/favicon.png';

export const GlobalStyles = createGlobalStyle`
  html {  min-height: 100%; }
  body {
    min-height: 100%;
    ${'' /* background-color: rgba(249, 215, 77, 0.03); */}
  }
`;

const system = `-apple-system, system-ui, BlinkMacSystemFont, 
'Segoe UI', Roboto, 'Helvetica Neue', 
Ubuntu, Arial, sans-serif;`;

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://api.cataloged.co/';

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
});

export const useMedia = query => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return matches;
};

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
      black: '#241A1B',
      gray: '#978d8e',
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
const title = 'Cataloged';
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
