module.exports = {
  siteMetadata: {
    title: `Cataoged`,
    description: `Organize what's important to you`,
    author: `Tyler Bainbridge`,
  },
  plugins: [
    // in gatsby-config.js
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
