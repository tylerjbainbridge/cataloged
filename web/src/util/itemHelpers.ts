import { ItemFull } from '../graphql/__generated__/ItemFull';
import { IconProps } from '@chakra-ui/core';

export interface ItemGenericData {
  type?: ItemFull['type'];
  title: String;
  createdAt: String;
  image?: String | null;
  compressedImage?: String | null;
  action?: Function;
  icon: IconProps['name'];
}

export const getGenericItemData = (item: ItemFull): ItemGenericData => {
  switch (item.type) {
    case 'file':
      //@ts-ignore
      if (item.file) {
        return {
          type: item.type,
          title: `${item.file.name}.${item.file.extension}`,
          createdAt: item.file.createdAt,
          image: item.file.fullUrl,
          compressedImage: item.file.squareUrl,
          icon: 'attachment',
        };
      }

    case 'note':
      //@ts-ignore
      if (item.note) {
        return {
          type: item.type,
          title: item.note.text,
          createdAt: item.note?.createdAt,
          image: null,
          icon: 'chat',
        };
      }

    case 'link':
      //@ts-ignore
      if (item.link) {
        return {
          type: item.type,
          title: item.link.title || item.link.href,
          createdAt: item.link.createdAt,
          image: item.link.image,
          icon: 'external-link',
          action: () => window.open(item?.link?.href, '_blank'),
        };
      }

    default:
      return {
        type: undefined,
        title: 'unknown',
        createdAt: item.createdAt,
        image: null,
        icon: 'question',
      };
  }
};
