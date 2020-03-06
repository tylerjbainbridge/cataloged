import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Box,
  Button,
  Text,
  Icon,
  Image,
  Tooltip,
  useToast,
} from '@chakra-ui/core';
import { useMutation, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import { usePaste } from '../hooks/usePaste';
import { randomString } from '../util/helpers';
import { SpecialFile } from '../util/aws';
import { useGlobalModal, ModalName } from './GlobalModal';
import { useHotKey } from '../hooks/useHotKey';
import { processFiles_processFiles } from '../graphql/__generated__/processFiles';

const UPLOAD_FILE_MUTATION = gql`
  mutation processFiles($uploadGroupId: String) {
    processFiles(uploadGroupId: $uploadGroupId) {
      id
      squareUrl
      fullUrl
    }
  }
`;

const GENERATE_SIGNED_URLS = gql`
  mutation generateSignedUrls($signedURLArgs: [SignedURLArgs!]) {
    generateSignedUrls(signedURLArgs: $signedURLArgs) {
      signedUrls
      uploadGroup {
        id
      }
    }
  }
`;

export const CreateFiles = () => {
  const [files, setFiles] = useState<{
    [key: string]: SpecialFile;
  }>({});

  const [isUploading, setIsUploading] = useState(false);

  const { isModalOpen, openModal, toggleModal, closeModal } = useGlobalModal(
    ModalName.CREATE_FILES_MODAL,
  );

  // useHotKey('c f', toggleModal);

  const toast = useToast();

  const fileCount = Object.keys(files).length;
  const fileVals = Object.values(files);
  const fileEntries = Object.entries(files);

  const [processFiles, { loading: isSubmitting }] = useMutation<
    processFiles_processFiles
  >(UPLOAD_FILE_MUTATION, {
    refetchQueries: ['feed'],
    onCompleted: () => {
      toast({
        title: 'Success',
        status: 'success',
        duration: 2000,
        position: 'bottom-left',
      });
    },
  });

  const isWorking = isUploading || isSubmitting;

  const [generateSignedUrls] = useMutation(GENERATE_SIGNED_URLS);

  useEffect(() => {
    (async () => {
      if (isUploading) {
        console.log({ fileVals });

        try {
          const signedURLArgs = fileVals.map(({ type, name, size }) => ({
            name,
            type,
            size,
          }));

          const {
            data: {
              generateSignedUrls: { signedUrls, uploadGroup },
            },
          } = await generateSignedUrls({
            variables: {
              signedURLArgs,
            },
          });

          await Promise.all(
            signedUrls.map(async (s3PutUrl: any, idx: number) => {
              const file = fileVals[idx];

              await fetch(s3PutUrl, {
                method: 'PUT',
                body: file,
                headers: {
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Content-Type': file.type,
                },
              });

              return { originalFilename: file.name };
            }),
          );

          setIsUploading(false);
          closeModal();
          setFiles({});

          await processFiles({ variables: { uploadGroupId: uploadGroup.id } });
        } catch (e) {
          setIsUploading(false);
        }
      }
    })();
  }, [isUploading]);

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (isWorking) {
      window.addEventListener('beforeunload', handler);
    } else {
      window.removeEventListener('beforeunload', handler);
    }

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isWorking]);

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
    <>
      <Modal
        size="600px"
        isOpen={isModalOpen}
        scrollBehavior="inside"
        onClose={() => {
          closeModal();
          setFiles({});
        }}
      >
        <ModalOverlay />
        <ModalContent height="60%" rounded="lg">
          <ModalHeader>Upload files</ModalHeader>
          <ModalCloseButton />
          <ModalBody {...getRootProps()}>
            <input {...getInputProps()} />
            {!!fileCount && (
              <Box d="block">
                {fileEntries.map(([key, file]) => (
                  <Box
                    key={key}
                    width="100%"
                    d="flex"
                    mb={15}
                    justifyContent="space-between"
                  >
                    <Box d="flex" alignItems="center" width="50%">
                      {file.type.split('/').shift() === 'image' && (
                        <Image
                          key={file.path}
                          src={URL.createObjectURL(file)}
                          objectFit="cover"
                          size="40px"
                          mr="15px"
                          rounded="lg"
                        />
                      )}

                      <Text>{file.name}</Text>
                    </Box>
                    <Box d="flex" verticalAlign="middle">
                      {!isWorking && (
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
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            {!fileCount && (
              <Box>
                <Text>Click, drag, or paste here</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isWorking}
              isDisabled={!fileCount}
              onClick={async () => {
                setIsUploading(true);
              }}
              color={!fileCount ? 'yellow' : 'green'}
            >
              <Box alignItems="center">
                <Icon name="add" />{' '}
                {!fileCount ? 'Waiting for files...' : 'Add'}
              </Box>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
