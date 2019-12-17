import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { Box, Text, ButtonGroup } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';

import { Item, ITEM_WIDTH } from './Item';
import { SelectContainer } from './SelectContainer';
import { getItems } from './__generated__/getItems';
import { usePagination } from '../hooks/useVariables';
import { CreateFiles } from './CreateFiles';
import { CreateLink } from './CreateLink';
import { SignOut } from './SignOut';
import { UploadProgress } from './UploadProgress';

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

const GridContainer = styled.div``;

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

  const initialLoad = loading && !data;

  console.log(data);

  return (
    <>
      <UploadProgress />
      <SelectContainer items={data ? data.items : []}>
        <Box d="flex" justifyContent="center">
          <Box width="100%" padding={50}>
            <Box
              height={100}
              d="flex"
              minWidth="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                d="flex"
                width="100px"
                justifyContent="space-between"
                alignItems="center"
              >
                <CreateFiles />
                <CreateLink />
              </Box>
              {/* <Text fontSize="4xl" margin={0}>
                Cataloged
              </Text> */}
              <SignOut />
            </Box>
            <br />
            {initialLoad ? (
              <Box d="flex" justifyContent="space-between" width="100%">
                {/* <Spinner size="xl" /> */}
              </Box>
            ) : (
              <Box
                d="grid"
                top={-80}
                justifyContent="space-between"
                flexWrap="wrap"
                gridColumnGap={20}
                gridRowGap={10}
                gridTemplateColumns={`${ITEM_WIDTH}px ${ITEM_WIDTH}px ${ITEM_WIDTH}px ${ITEM_WIDTH}px`}
              >
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
                <Waypoint
                  bottomOffset={-500}
                  onEnter={() => {
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
                />
              </Box>
            )}
          </Box>
        </Box>
      </SelectContainer>
    </>
  );
};
