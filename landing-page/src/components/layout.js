import React from "react"
import Helmet from "react-helmet"
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core"
import { createGlobalStyle } from "styled-components"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import favicon from "../images/favicon.png"

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: white;
  }
`

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      pink: "#ED6C7F",
      purple: "#5718FF",
      yellow: "#F9D64D",
    },
  },
}

const description = "Organize what's important to you"
const title = "Cataloged"
const image =
  "https://collections-file-storage-1.s3.amazonaws.com/assets/logo.png"
const url = "https://cataloged.co/"
const author = "Tyler Bainbridge"
const keywords = [
  "personal knowledge base",
  "knowledge base",
  "note taking",
  "file storage",
  "bookmarks",
]

export default ({ children }) => (
  <>
    <Helmet
      title="Cataloged"
      link={[{ rel: "shortcut icon", type: "image/png", href: `${favicon}` }]}
      title={title}
      titleTemplate={`%s | ${title}`}
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
          property: "og:url",
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
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  </>
)
