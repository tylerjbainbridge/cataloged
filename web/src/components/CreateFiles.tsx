import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button, List, Image, Segment, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { omit } from 'lodash';
import gql from 'graphql-tag';
import { usePaste } from '../hooks/usePaste';
import { randomString } from '../util/helpers';

const UPLOAD_FILE_MUTATION = gql`
  mutation createFiles($files: [Upload!]!) {
    createFiles(files: $files) {
      id
      squareUrl
      fullUrl
    }
  }
`;

interface SpecialFile extends FileWithPath {
  id: string;
}

export const CreateFiles = () => {
  const [files, setFiles] = useState<{
    [key: string]: SpecialFile;
  }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileCount = Object.keys(files).length;
  const fileVals = Object.values(files);
  const fileEntries = Object.entries(files);

  const [createFiles, { loading }] = useMutation(UPLOAD_FILE_MUTATION, {
    variables: { files: fileVals },
    refetchQueries: ['getItems'],
    onCompleted: () => {
      setIsModalOpen(false);
      setFiles({});
    },
  });

  const onDrop = useCallback(
    acceptedFiles => {
      setFiles({
        ...files,
        ...acceptedFiles.reduce(
          (p: { [key: string]: SpecialFile }, c: SpecialFile) => {
            const id = randomString();
            c.id = id;

            return {
              ...p,
              [id]: c,
            };
          },
          {},
        ),
      });
    },
    [files],
  );

  const onPaste = (e: any) => {
    const { items } = e.clipboardData;

    for (let i = 0; i < items.length; i++) {
      const item = e.clipboardData.items[i];
      const blob = item.getAsFile();
      if (blob) {
        const id = randomString();

        blob.id = id;

        setFiles({
          ...files,
          [id]: blob,
        });
      }
    }
  };

  usePaste({ onPaste });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Modal
      open={isModalOpen}
      closeIcon
      onClose={() => {
        setIsModalOpen(false);
        setFiles({});
      }}
      size="small"
      centered={false}
      trigger={<Button icon="file" onClick={() => setIsModalOpen(true)} />}
    >
      <Modal.Header>Drag photos below or paste from clipboard</Modal.Header>
      <Modal.Content image scrolling {...getRootProps()}>
        <Segment basic loading={loading} style={{ width: '100%' }}>
          <input {...getInputProps()} />
          {!!fileCount && (
            <List
              divided
              relaxed
              verticalAlign="middle"
              style={{ width: '100%' }}
            >
              {fileEntries.map(([key, file]) => (
                <List.Item key={key}>
                  <Image
                    rounded
                    key={file.path}
                    src={
                      'https://react.semantic-ui.com/images/wireframe/image.png' ||
                      URL.createObjectURL(file)
                    }
                    style={{
                      objectFit: 'cover',
                      width: 40,
                      height: 40,
                    }}
                  />
                  <List.Content>{file.name}</List.Content>
                  <List.Content verticalAlign="middle" floated="right">
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();

                        const { [file.id]: temp, ...rest } = files;

                        setFiles(rest);
                      }}
                    >
                      Remove
                    </Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          )}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={!fileCount}
          onClick={async () => await createFiles()}
          labelPosition="right"
          icon="add"
          color={!fileCount ? 'yellow' : 'green'}
          content={!fileCount ? 'Waiting for images...' : 'Add'}
        />
      </Modal.Actions>
    </Modal>
  );
};
