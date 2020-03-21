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
  try {
    const { data: html, headers } = await axios.get(url);

    const isIframeDisabled =
      headers['x-frame-options'] &&
      ['SAMEORIGIN', 'DENY'].includes(headers['x-frame-options']);

    return {
      isIframeDisabled,
      ...(await metascraper({ html, url })),
    };
  } catch (e) {
    return {
      isIframeDisabled: true,
    };
  }
};

export const getIsIframeDisabled = async (url: string) => {
  try {
    const res = await axios.get(url);

    return (
      res.headers['x-frame-options'] &&
      ['SAMEORIGIN', 'DENY'].includes(res.headers['x-frame-options'])
    );

    // return await metascraper({ html, url });
  } catch (e) {
    console.log(url, e.message);
    return true;
  }
};
