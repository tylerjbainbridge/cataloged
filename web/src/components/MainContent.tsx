import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Grid, Segment, Visibility, Loader, Header } from 'semantic-ui-react';

import { Item } from './Item';
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

export const MainContent = ({ rowLength = 4 }: { rowLength?: number }) => {
  const { paginationVariables } = usePagination();

  const { loading, data, fetchMore } = useQuery<getItems>(GET_FILES, {
    variables: paginationVariables,
    notifyOnNetworkStatusChange: true,
  });

  useQuery(GET_UPLOAD_GROUPS, {
    // pollInterval: 1000,
    notifyOnNetworkStatusChange: true,
  });

  const initialLoad = loading && !data;

  console.log(data);

  return (
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
          <Grid
            relaxed
            columns="equal"
            as={Segment}
            basic
            loading={initialLoad}
            style={{ top: -80 }}
          >
            {data &&
              data.items &&
              Array.from(
                new Array(Math.ceil(data.items.length / rowLength)),
              ).map((_, rowIdx) => {
                return (
                  // @ts-ignore
                  <Grid.Row key={rowIdx} columns={rowLength}>
                    {Array.from(new Array(rowLength)).map((_, columnIdx) => {
                      const fileIdx =
                        columnIdx + (rowIdx !== 0 ? rowLength * rowIdx : 0);

                      const item = data.items && data.items[fileIdx];

                      return (
                        <Grid.Column
                          key={`${columnIdx}${rowIdx}${
                            item ? item.id : 'placeholder'
                          }`}
                        >
                          {item ? <Item item={item} /> : <Segment basic />}
                        </Grid.Column>
                      );
                    })}
                  </Grid.Row>
                );
              })}
            {/* <Grid.Row>
              <Loader active={!!(loading && data)} />
            </Grid.Row> */}
          </Grid>
        </Visibility>
      </Segment>
    </Segment>
  );
};
