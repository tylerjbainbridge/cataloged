import React from 'react';
import { FaUser, FaFile } from 'react-icons/fa';
import { IconProps } from '@chakra-ui/core';

import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FileFull } from '../graphql/__generated__/FileFull';

export interface ItemGenericData {
  type?: ItemFull['type'];
  displayType?: string;
  title: string;
  subTitle?: string;
  createdAt: string;
  image?: string | null;
  compressedImage?: string | null;
  favicon?: string | null;
  action?: Function;
  icon: IconProps['name'] | any;
}

export const isFileImage = (file: FileFull) =>
  file.contentType?.split('/').shift() === 'image';

export const getFileIcon = (file: FileFull) => {
  return <FaFile />;
};

export const getFileData = (file: FileFull) => {
  if (!isFileImage(file)) {
    return {
      image: null,
      compressedImage: null,
      icon: getFileIcon(file),
    };
  }

  return {};
};

export const getGenericItemData = (item: ItemFull): ItemGenericData => {
  switch (item.type) {
    case 'file':
      //@ts-ignore
      if (item.file) {
        return {
          type: item.type,
          title: item.file.title || `${item.file.name}.${item.file.extension}`,
          subTitle: item.file.description,
          createdAt: item.date,
          image: item.file.fullUrl,
          compressedImage: item.file.squareUrl,
          icon: 'attachment',
          ...getFileData(item.file),
        };
      }

    case 'note':
      //@ts-ignore
      if (item.note) {
        return {
          type: item.type,
          // @ts-ignore
          title: item.note.title || 'Untitled',
          subTitle: item.note.text.split('\n')[0],
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
          ...(item.link.title
            ? {
                title: item.link.title,
                subTitle: item.link.href,
              }
            : {
                title: 'Untitled',
                subTitle: item.link.href,
              }),
          createdAt: item.date,
          image: item.link.image || item.link.logo || item.link.favicon,
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
