import React, { useEffect, useState } from 'react';

import {
  Grid,
  Image as SemanticImage,
  Segment,
  Dimmer,
  Loader,
  Item,
  Header,
  Modal,
  Popup,
} from 'semantic-ui-react';

import { getFiles_files } from './__generated__/getFiles';

export const File = ({ file }: { file: getFiles_files }) => {
  const [isThumbnailImageReady, setIsThumbnailImageReady] = useState<
    string | null
  >(null);
  const [isFullImageReady, setIsFullImageReady] = useState<string | null>(null);

  useEffect(() => {
    if (file.isUploaded) {
      const squareImage = new Image();
      squareImage.onload = e => setIsThumbnailImageReady(squareImage.src);
      squareImage.src = file.squareUrl;

      const fullImage = new Image();
      fullImage.onload = () => setIsFullImageReady(fullImage.src);
      fullImage.src = file.fullUrl;
    }
  }, [file.isUploaded]);

  return (
    <div style={{ cursor: 'pointer' }}>
      <Modal
        closeIcon
        size="large"
        style={{ height: '80%' }}
        trigger={
          !file.isUploaded || !isThumbnailImageReady ? (
            <Segment loading style={{ width: 280, height: 280 }} />
          ) : (
            <SemanticImage
              size="huge"
              rounded
              style={{ width: 280, height: 280 }}
              src={
                !file.isUploaded
                  ? 'https://react.semantic-ui.com/images/wireframe/image.png'
                  : file.squareUrl
              }
            />
          )
        }
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
          {!file.isUploaded || !isFullImageReady ? (
            <Dimmer inverted active>
              <Loader inline="centered" />
            </Dimmer>
          ) : (
            <SemanticImage
              rounded
              src={file.fullUrl}
              style={{ height: '100%' }}
            />
          )}
        </Modal.Content>
      </Modal>
      <Popup
        trigger={
          <Header>
            {file.name}.{file.extension}
          </Header>
        }
        position="bottom center"
        content="View full photo"
      />
    </div>
  );
};
