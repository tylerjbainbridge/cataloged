import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { Grid, Segment, Visibility, Loader, Header } from 'semantic-ui-react';

import { Item } from './Item';
import { SelectContainer } from './SelectContainer';
import { getItems } from './__generated__/getItems';
import { usePagination } from '../hooks/useVariables';
import { CreateFiles } from './CreateFiles';
import { CreateLink } from './CreateLink';
import { SignOut } from './SignOut';

const GET_UPLOAD_GROUPS = gql`
  query getUploadGroups {
    uploadGroups {
      id
      isComplete

      files {
        id
        isUploaded
      }
    }
  }
`;

const GET_FILES = gql`
  query getItems($first: Int, $skip: Int) {
    items(first: $first, skip: $skip, orderBy: { createdAt: desc }) {
      id
      type

      link {
        id
        href
        notes

        image
        favicon
        title
        description
      }

      file {
        id
        name
        extension
        isUploaded
        fullUrl
        squareUrl
      }
    }
  }
`;

const GridContainer = styled.div`
  top: -80px;
  display: grid;
  justify-items: center;

  grid-column-gap: 10px;
  grid-row-gap: 10px;

  grid-template-columns: auto auto auto auto;

  @media (max-width: 400px) {
    display: block;
  }
`;

const GridItem = styled.div`
  justify-self: center;

  @media (max-width: 400px) {
    width: 100%;
    /* max-width: inherit; */
  }
`;

export const MainContent = ({ rowLength = 4 }: { rowLength?: number }) => {
  const { paginationVariables } = usePagination();

  const { loading, data, fetchMore } = useQuery<getItems>(GET_FILES, {
    variables: paginationVariables,
    notifyOnNetworkStatusChange: true,
  });

  useQuery(GET_UPLOAD_GROUPS, {
    pollInterval: 1000 * 3,
    notifyOnNetworkStatusChange: true,
  });

  const initialLoad = loading && !data;

  return (
    <SelectContainer items={data ? data.items : []}>
      <Segment
        basic
        style={{
          display: 'flex',
          justifyContent: 'center',
          ...(initialLoad ? { height: '100vh' } : {}),
        }}
      >
        <Segment style={{ width: '90vw', marginTop: 100 }}>
          <Segment
            basic
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              top: -80,
              height: 50,
            }}
          >
            <div>
              <CreateFiles />
              <CreateLink />
            </div>
            <Header size="large" subheader="test">
              Cataloged
            </Header>
            <SignOut />
          </Segment>
          <br />
          <Visibility
            continuous
            offset={-500}
            onBottomVisible={() => {
              if (data && data.items && !loading) {
                fetchMore({
                  variables: {
                    skip: data.items.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...prev,
                      items: [
                        ...(prev.items || []),
                        ...(fetchMoreResult.items || []),
                      ],
                    };
                  },
                });
              }
            }}
          >
            <Segment basic loading={initialLoad} as={GridContainer}>
              {data &&
                data.items &&
                data.items.map(item => (
                  <GridItem key={item.id}>
                    <Item item={item} />
                  </GridItem>
                ))}
              {/* <Grid.Row>
              <Loader active={!!(loading && data)} />
            </Grid.Row> */}
            </Segment>
          </Visibility>
        </Segment>
      </Segment>
    </SelectContainer>
  );
};
