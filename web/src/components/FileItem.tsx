// @ts-nocheck
import React, { useContext } from 'react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { ItemHeader, ItemContentContainer } from './Item';
import { FileModal } from './FileModal';
import { ItemFull, ItemFull_file } from '../graphql/__generated__/ItemFull';
import { FeedContext } from './Feed';

export interface ItemWithFile extends ItemFull {
  file: ItemFull_file;
}

export const FileItem = ({ item }: { item: ItemWithFile }) => {
  const { openItemModal } = useContext(FeedContext);

  const { file } = item;

  const onOpen = () => openItemModal(item);

  return (
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
  );
};
