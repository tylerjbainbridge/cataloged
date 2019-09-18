import React from 'react';
import { Header, Popup } from 'semantic-ui-react';

import { getItems_items_link, getItems_items } from './__generated__/getItems';
import { LazyImage } from './LazyImage';
import { Click } from './Click';
import { SelectOnClick } from './SelectOnClick';

export interface ItemWithLink extends getItems_items {
  link: getItems_items_link;
}

export const Link = ({ item }: { item: ItemWithLink }) => {
  const { link } = item;

  return (
    <div>
      <SelectOnClick onDoubleClick={() => window.open(link.href)} item={item}>
        {({ style, ...clickProps }) => (
          <LazyImage
            src={link.image || link.favicon || ''}
            style={{
              width: 280,
              height: 280,
              objectFit: 'cover',
              objectPosition: '50% 50%',
              ...style,
            }}
            {...clickProps}
          />
        )}
      </SelectOnClick>
      <Popup
        trigger={
          <Click onSingleClick={() => window.open(link.href)}>
            {clickProps => (
              <Header {...clickProps}>{link.title || 'link.href'}</Header>
            )}
          </Click>
        }
        content="Visit link"
        basic
        position="bottom center"
      />
    </div>
  );
};
