// @ts-nocheck
import React from 'react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { ITEM_ACTUAL_WIDTH, ItemHeader, ItemContentContainer } from './Item';
import { FileModal } from './FileModal';
import { feed_items, feed_items_file } from '../graphql/__generated__/feed';

export interface ItemWithFile extends feed_items {
  file: feed_items_file;
}

export const FileItem = ({ item }: { item: ItemWithFile }) => {
  const { file } = item;

  return (
    <FileModal item={item}>
      {({ onOpen }) => (
        <ItemContentContainer item={item} tooltip="Open file">
          <SelectOnClick onSingleClick={onOpen} item={item}>
            {clickProps => (
              <LazyImage
                width="100%"
                height="100%"
                objectFit="cover"
                isReady={file.isUploaded}
                src={!file.isUploaded ? null : file.squareUrl}
                {...clickProps}
              />
            )}
          </SelectOnClick>
          <ItemHeader item={item} onSingleClick={onOpen}>
            {file.name}.{file.extension}
          </ItemHeader>
        </ItemContentContainer>
      )}
    </FileModal>
  );
};
