import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Box, Icon, Text } from '@chakra-ui/core';
import { usePrevious } from '../hooks/usePrevious';

const GET_UPLOAD_GROUPS = gql`
  query getUploadGroups {
    uploadGroups {
      id
      isComplete

      files {
        id
        name
        extension
        isUploaded
      }
    }
  }
`;

export const UploadProgress = () => {
  return null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data } = useQuery(GET_UPLOAD_GROUPS, {
    pollInterval: 1000 * 1,
    notifyOnNetworkStatusChange: true,
  });

  const client = useApolloClient();

  const uploadGroups = _.get(data, 'uploadGroups', []);

  const prevUploadGroups = usePrevious(uploadGroups);

  useEffect(() => {
    window.onbeforeunload = () => {
      if (uploadGroups.length) {
        return 'Data may be lost if you leave the page, are you sure?';
      }
    };
  });

  useEffect(() => {
    if (!prevUploadGroups && uploadGroups.length) {
      setIsMenuOpen(true);
    } else if (
      prevUploadGroups &&
      prevUploadGroups.length &&
      !uploadGroups.length
    ) {
      setTimeout(
        () => async () => await client.reFetchObservableQueries(),
        1000,
      );
    }
  }, [uploadGroups.length]);

  if (!uploadGroups.length && !isMenuOpen) return null;

  const files = uploadGroups.reduce(
    (p: any[], c: any) => [...p, ...c.files],
    [],
  );

  const completedFiles = files.filter((file: any) => file.isUploaded);

  return (
    <Box
      position="fixed"
      zIndex={1000}
      backgroundColor="white"
      margin={20}
      width={400}
      height={200}
      bottom={0}
      padding={0}
      left={0}
      overflowY="hidden"
    >
      <Box
        backgroundColor="#E0E1EC"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={50}
        margin={0}
      >
        <Text style={{ margin: 0 }}>
          Completed {completedFiles.length} of {files.length}
        </Text>
        {completedFiles.length === files.length && (
          <Icon onClick={() => setIsMenuOpen(false)} name="close" />
        )}
      </Box>
      <Box
        margin={0}
        paddingLeft={10}
        paddingRight={10}
        paddingBottom={60}
        overflow="auto"
        height="100%"
      >
        {_.orderBy(files, ({ isUploaded }) => !isUploaded).map((file: any) => (
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              {file.name}
              {file.extension}
            </span>
            {file.isUploaded ? (
              <Icon color="green" name="check" />
            ) : (
              <Icon name="spinner" />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
