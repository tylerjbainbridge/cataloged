import { ItemFull_link } from '../graphql/__generated__/ItemFull';

export const getYoutubeId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7].length == 11 ? match[7] : false;
};

export const getTweetMetaFromUrl = (link: ItemFull_link) => {
  try {
    const url = new URL(link.href);

    const parsed = url.pathname
      .replace(link.host || '', '')
      .split('/')
      .filter(Boolean);

    const [username, type, id] = parsed;

    return {
      username,
      type,
      id,
    };
  } catch (e) {
    return {};
  }
};
