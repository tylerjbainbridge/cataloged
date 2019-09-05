import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Modal,
} from 'semantic-ui-react';

import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useAuth } from '../hooks/useAuth';

export const SideNavContent = () => {
  const { user } = useAuth();

  return (
    <Grid textAlign="center">
      <Grid.Row columns={1}>
        <Grid.Column>
          {user && (
            <>
              <Header as="h4">{user.email}</Header>
              <Header as="h5">{user.fullName}</Header>
            </>
          )}
        </Grid.Column>
        <Grid.Column>{/* <UploadModal /> */}</Grid.Column>
      </Grid.Row>
      <Grid columns={3} divided>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid>
    </Grid>
  );
};
