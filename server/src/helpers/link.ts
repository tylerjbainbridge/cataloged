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
    const requestHeaders = {};

    if (new URL(url).host.includes('amazon')) {
      //@ts-ignore
      requestHeaders['User-Agent'] = 'GoogleBot';
    } else {
      //@ts-ignore
      requestHeaders['User-Agent'] = 'Mozilla/5.0';
    }

    const { data: html, headers } = await axios.get(url, {
      headers: requestHeaders,
    });

    const isIframeDisabled =
      headers['x-frame-options'] &&
      ['SAMEORIGIN', 'DENY'].includes(headers['x-frame-options']);

    return {
      isIframeDisabled,
      ...(await metascraper({ html, url })),
    };
  } catch (e) {
    console.log(url, e.message);

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
