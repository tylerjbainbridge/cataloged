import React, { useEffect, useState } from 'react';

import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  Item,
  Header,
  Modal,
  Popup,
} from 'semantic-ui-react';

import { LazyImage } from './LazyImage';
import { SelectOnClick } from './SelectOnClick';
import { getItems_items, getItems_items_file } from './__generated__/getItems';
import { Click } from './Click';

export interface ItemWithFile extends getItems_items {
  file: getItems_items_file;
}

export const File = ({ item }: { item: ItemWithFile }) => {
  const { file } = item;

  const [isModalOpen, updateIsModalOpen] = useState(false);

  const openModal = () => updateIsModalOpen(true);
  const closeModal = () => updateIsModalOpen(false);

  return (
    <div>
      <SelectOnClick onDoubleClick={openModal} item={item}>
        {({ style, ...clickProps }) => (
          <LazyImage
            size="huge"
            rounded
            style={{ width: 280, height: 280, ...style }}
            isReady={file.isUploaded}
            src={
              !file.isUploaded
                ? 'https://react.semantic-ui.com/images/wireframe/image.png'
                : file.squareUrl
            }
            {...clickProps}
          />
        )}
      </SelectOnClick>
      <Modal
        closeIcon
        closeOnEscape
        closeOnDimmerClick
        open={isModalOpen}
        onClose={closeModal}
        size="large"
        style={{ height: '80%' }}
      >
        <Modal.Header>
          {file.name}.{file.extension}
        </Modal.Header>

        <Modal.Content
          style={{ height: '90%', display: 'flex', justifyContent: 'center' }}
          image
          as={Segment}
          basic
        >
          {!file.isUploaded ? (
            <Dimmer inverted active>
              <Loader inline="centered" />
            </Dimmer>
          ) : (
            <LazyImage
              rounded
              src={file.fullUrl}
              style={{
                width: 'auto',
                height: '100%',
              }}
            />
          )}
        </Modal.Content>
      </Modal>
      <Popup
        trigger={
          <Click onSingleClick={openModal}>
            {clickProps => (
              <Header {...clickProps}>
                {file.name}.{file.extension}
              </Header>
            )}
          </Click>
        }
        position="bottom center"
        content="View full photo"
      />
    </div>
  );
};
