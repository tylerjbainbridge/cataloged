import axios from 'axios';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
]);

export const getMetadataFromUrl = async (url: string) => {
  const { data: html } = await axios.get(url);

  try {
    return await metascraper({ html, url });
  } catch (e) {
    return {};
  }
};
