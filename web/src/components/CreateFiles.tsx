import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button, List, Image, Segment, Modal } from 'semantic-ui-react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { usePaste } from '../hooks/usePaste';
import { randomString } from '../util/helpers';
import { SpecialFile, uploadFile } from '../util/aws';
import { createFiles_createFiles } from './__generated__/createFiles';

const UPLOAD_FILE_MUTATION = gql`
  mutation createFiles($files: [Upload!], $keyBlobs: [KeyBlob!]) {
    createFiles(files: $files, keyBlobs: $keyBlobs) {
      id
      squareUrl
      fullUrl
    }
  }
`;

const GET_S3_URLS = gql`
  query s3PutUrl($signedURLArgs: [SignedURLArgs!]) {
    s3PutUrls(signedURLArgs: $signedURLArgs)
  }
`;

export const CreateFiles = () => {
  const [files, setFiles] = useState<{
    [key: string]: SpecialFile;
  }>({});

  const [isUploading, setIsUploading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApolloClient();

  const fileCount = Object.keys(files).length;
  const fileVals = Object.values(files);
  const fileEntries = Object.entries(files);

  const [createFiles, { loading: isSubmitting }] = useMutation<
    createFiles_createFiles
  >(UPLOAD_FILE_MUTATION, {
    refetchQueries: ['getItems'],
    onCompleted: () => {
      setIsModalOpen(false);
      setFiles({});
    },
  });

  useEffect(() => {
    (async () => {
      if (isUploading) {
        const s3Keys = fileVals.map(file => `temp/${file.id}-${file.name}`);

        try {
          const {
            data: { s3PutUrls },
          } = await client.query({
            query: GET_S3_URLS,
            fetchPolicy: 'network-only',
            variables: {
              signedURLArgs: fileVals.map(({ type }, idx) => ({
                key: s3Keys[idx],
                type: type,
              })),
            },
          });

          const keyBlobs = await Promise.all(
            s3PutUrls.map(async (s3PutUrl: any, idx: number) => {
              const file = fileVals[idx];
              const key = s3Keys[idx];

              await fetch(s3PutUrl, {
                method: 'PUT',
                body: file,
                headers: {
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Content-Type': file.type,
                },
              });

              return { tempKey: key, originalFilename: file.name };
            }),
          );

          setIsUploading(false);

          await createFiles({ variables: { keyBlobs } });
        } catch (e) {
          setIsUploading(false);
        }
      }
    })();
  }, [isUploading]);

  const isWorking = isUploading || isSubmitting;

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

  const onPaste = async (e: any) => {
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
        <Segment basic loading={isWorking} style={{ width: '100%' }}>
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
          onClick={async () => {
            setIsUploading(true);
          }}
          labelPosition="right"
          icon="add"
          color={!fileCount ? 'yellow' : 'green'}
          content={!fileCount ? 'Waiting for images...' : 'Add'}
          loading={isWorking}
        />
      </Modal.Actions>
    </Modal>
  );
};
