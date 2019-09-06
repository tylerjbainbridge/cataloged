import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button, List, Image, Segment, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { omit } from 'lodash';
import gql from 'graphql-tag';

const UPLOAD_FILE_MUTATION = gql`
  mutation createFiles($files: [Upload!]!) {
    createFiles(files: $files) {
      id
      squareUrl
      fullUrl
    }
  }
`;

export const CreateFiles = () => {
  const [files, setFiles] = useState<{
    [key: string]: FileWithPath;
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
          (p: { [key: string]: FileWithPath }, c: FileWithPath) => ({
            ...p,
            [c.name]: c,
          }),
          {},
        ),
      });
    },
    [files],
  );

  const onPaste = useCallback(
    (e: any) => {
      e.persist();

      const { items } = e.clipboardData;

      for (let i = 0; i < items.length; i++) {
        const item = e.clipboardData.items[i];
        const blob = item.getAsFile();
        if (blob) {
          const { lastModified } = blob;

          setFiles({
            ...files,
            [lastModified]: blob,
          });
        }
      }
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      <Modal.Header>Drag files below to upload</Modal.Header>
      <Modal.Content image scrolling {...getRootProps()} onPaste={onPaste}>
        <Segment basic loading={loading} style={{ width: '100%' }}>
          <input {...getInputProps()} />
          {!!fileCount ? (
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
                        setFiles(omit(files, file.name));
                      }}
                    >
                      Remove
                    </Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            <p>No files</p>
          )}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={async () => await createFiles()}
          labelPosition="right"
          icon="upload"
          content="Upload"
        />
      </Modal.Actions>
    </Modal>
  );
};
