// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { useDisclosure } from '@chakra-ui/core';
import { Labels } from './Labels';
import { feed_items } from './__generated__/feed';
import { ITEM_ACTUAL_WIDTH, ItemHeader, ItemContentContainer } from './Item';
import { FileModal } from './FileModal';

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
                width={ITEM_ACTUAL_WIDTH}
                height="200px"
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
