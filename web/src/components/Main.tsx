import React from 'react';
import styled from 'styled-components';

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
} from 'semantic-ui-react';

import { useAuth } from '../hooks/useAuth';

export const Main = () => {
  const { user } = useAuth();

  return (
    <Grid textAlign="center">
      <Grid.Row columns={1}>
        <Grid.Column>
          {user && <Header as="h3">{user.email}</Header>}
        </Grid.Column>
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
