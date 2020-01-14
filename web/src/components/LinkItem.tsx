import React, { useContext } from 'react';
import { Icon } from '@chakra-ui/core';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { ItemHeader, ItemContentContainer } from './Item';
import { ItemFull, ItemFull_link } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';

export interface ItemWithLink extends ItemFull {
  link: ItemFull_link;
}

export const LinkItem = ({ item }: { item: ItemWithLink }) => {
  const { openItemModal } = useContext(FeedContext);
  const { link } = item;

  // const url = new URL(link.href);

  const onOpen = () => openItemModal(item);

  return (
    <>
      <ItemContentContainer item={item} tooltip="Open (⌘ + click to go to url)">
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
  );
};
