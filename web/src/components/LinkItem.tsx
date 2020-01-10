import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { ITEM_ACTUAL_WIDTH, ItemHeader, ItemContentContainer } from './Item';
import { LinkModal } from './LinkModal';
import { feed_items_link, feed_items } from '../graphql/__generated__/feed';

export interface ItemWithLink extends feed_items {
  link: feed_items_link;
}

export const LinkItem = ({ item }: { item: ItemWithLink }) => {
  const { link } = item;

  // const url = new URL(link.href);

  return (
    <LinkModal item={item}>
      {({ onOpen }) => (
        <>
          <ItemContentContainer
            item={item}
            tooltip="Open (⌘ + click to go to url)"
          >
            <SelectOnClick
              onSingleClick={onOpen}
              onMetaClick={() => window.open(link.href, '_blank')}
              item={item}
            >
              {clickProps => (
                <LazyImage
                  src={link.image}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  placeholderIcon="external-link"
                  {...clickProps}
                />
              )}
            </SelectOnClick>
          </ItemContentContainer>
          <ItemHeader
            item={item}
            onSingleClick={() => window.open(link.href, '_blank')}
          >
            <Icon name="link" fontSize="s" mr={2} /> {link.title || link.href}
          </ItemHeader>
        </>
      )}
    </LinkModal>
  );
};
