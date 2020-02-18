import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IconProps } from '@chakra-ui/core';

import { ItemFull } from '../graphql/__generated__/ItemFull';

export interface ItemGenericData {
  type?: ItemFull['type'];
  displayType?: String;
  title: String;
  subTitle?: String;
  createdAt: String;
  image?: String | null;
  compressedImage?: String | null;
  favicon?: String | null;
  action?: Function;
  icon: IconProps['name'] | any;
}

export const getGenericItemData = (item: ItemFull): ItemGenericData => {
  switch (item.type) {
    case 'file':
      //@ts-ignore
      if (item.file) {
        return {
          type: item.type,
          title: item.file.title || `${item.file.name}.${item.file.extension}`,
          createdAt: item.date,
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
          // @ts-ignore
          title: item.note.title || item.note.text.split('\n').pop(),
          createdAt: item.date,
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
          createdAt: item.date,
          image: item.link.image,
          icon: 'external-link',
          favicon: item.link.favicon,
          action: () => window.open(item?.link?.href, '_blank'),
        };
      }

    case 'googleContact':
      //@ts-ignore
      if (item.googleContact) {
        return {
          type: item.type,
          subTitle: [
            item.googleContact.companyTitle,
            item.googleContact.companyName,
          ]
            .filter(Boolean)
            .join(' at '),
          displayType: 'contact',
          title: item.googleContact.name || 'unknown',
          createdAt: item.date,
          image: item.googleContact.photoUrl,
          icon: <FaUser />,
        };
      }

    default:
      return {
        type: undefined,
        title: 'unknown',
        createdAt: item.date,
        image: null,
        icon: 'question',
      };
  }
};
