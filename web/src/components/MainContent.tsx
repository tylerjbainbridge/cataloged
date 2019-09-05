import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Grid, Segment, Visibility, Loader } from 'semantic-ui-react';

import { Item } from './Item';
import { getItems } from './__generated__/getItems';
import { usePagination } from '../hooks/useVariables';
import { CreateFiles } from './CreateFiles';

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
      type

      link {
        id
        href
        notes
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

export const MainContent = () => {
  const { paginationVariables } = usePagination();

  const { loading, data, fetchMore } = useQuery<getItems>(GET_FILES, {
    variables: paginationVariables,
    notifyOnNetworkStatusChange: true,
  });

  useQuery(GET_UPLOAD_GROUPS, {
    pollInterval: 500,
    notifyOnNetworkStatusChange: true,
  });

  const initialLoad = loading && !data;

  return (
    <Segment
      basic
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...(initialLoad ? { height: '100vh' } : {}),
      }}
    >
      <Segment style={{ width: '80vw' }}>
        <Segment basic>
          <CreateFiles />
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
          >
            {data &&
              data.items &&
              Array.from(new Array(Math.ceil(data.items.length / 4))).map(
                (_, rowIdx) => {
                  return (
                    <Grid.Row key={rowIdx} columns={4}>
                      {Array.from(new Array(4)).map((_, columnIdx) => {
                        const fileIdx =
                          columnIdx + (rowIdx !== 0 ? 4 * rowIdx : 0);

                        const item = data.items && data.items[fileIdx];

                        return (
                          <Grid.Column key={`${columnIdx}${rowIdx}`}>
                            {item ? <Item item={item} /> : <Segment basic />}
                          </Grid.Column>
                        );
                      })}
                    </Grid.Row>
                  );
                },
              )}
            <Grid.Row>
              <Loader active={!!(loading && data)} />
            </Grid.Row>
          </Grid>
        </Visibility>
      </Segment>
    </Segment>
  );
};
