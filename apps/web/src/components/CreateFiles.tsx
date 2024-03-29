import React, { useCallback, useState, useEffect, useRef } from 'react';
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
  Progress,
  Stack,
} from '@chakra-ui/core';
import { useMutation, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import { usePaste } from 'cataloged-shared/hooks/usePaste';
import { randomString } from 'cataloged-shared/util/helpers';
import { SpecialFile } from 'cataloged-shared/util/aws';
import { useGlobalModal, ModalName } from './GlobalModal';
import { useHotKey } from 'cataloged-shared/hooks/useHotKey';
import { processFiles_processFiles } from 'cataloged-shared/graphql/__generated__/processFiles';

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

  const [completedCount, setCompletedCount] = useState(0);

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

  const { current: fileFinished } = useRef(() => {
    setCompletedCount(completedCount => completedCount + 1);
  });

  useEffect(() => {
    (async () => {
      if (isUploading) {
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

              fileFinished();

              return { originalFilename: file.name };
            }),
          );

          setIsUploading(false);
          closeModal();
          setFiles({});
          setCompletedCount(0);

          await processFiles({ variables: { uploadGroupId: uploadGroup.id } });
        } catch (e) {
          setIsUploading(false);
          // setCompletedCount(0);
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
            <Stack
              d="flex"
              justifyContent={isUploading ? 'space-between' : 'flex-end'}
              alignItems="center"
              width="100%"
              isInline
              spacing={5}
            >
              {isUploading && (
                <Progress
                  hasStripe
                  isAnimated
                  width="70%"
                  height="100%"
                  color="green"
                  rounded="lg"
                  value={(completedCount / fileVals.length) * 100 || 5}
                />
              )}
              <Button
                isLoading={isWorking}
                isDisabled={!fileCount}
                onClick={async () => {
                  setIsUploading(true);
                }}
                color={!fileCount ? 'yellow' : 'green'}
                width="30%"
              >
                <Box alignItems="center">
                  <Icon name="add" />{' '}
                  {!fileCount ? 'Waiting for files...' : 'Add'}
                </Box>
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
