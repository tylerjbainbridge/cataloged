import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { Box } from '@chakra-ui/core';
import { Waypoint } from 'react-waypoint';

import { Item, ITEM_WIDTH } from './Item';
import { SelectContainer } from './SelectContainer';
import { usePagination } from '../hooks/useVariables';
import { CreateFiles } from './CreateFiles';
import { CreateLink } from './CreateLink';
import { SignOut } from './SignOut';
import { UploadProgress } from './UploadProgress';
import { Filter } from './Filter';
import { NoteModal } from './NoteModal';
import { feed } from './__generated__/feed';
import { ITEM_FULL_FRAGMENT } from '../graphql/item';

export const FEED_QUERY = gql`
  query feed($first: Int, $skip: Int, $where: ItemWhereInput) {
    items(
      first: $first
      skip: $skip
      where: $where
      orderBy: { createdAt: desc }
    ) @connection(key: "feed_items") {
      ...ItemFull
    }
  }

  ${ITEM_FULL_FRAGMENT}
`;

const GridContainer = styled.div``;

const GridItem = styled.div`
  justify-self: center;

  @media (max-width: 400px) {
    width: 100%;
    /* max-width: inherit; */
  }
`;

export const Feed = ({ rowLength = 4 }: { rowLength?: number }) => {
  const { paginationVariables } = usePagination();

  const { loading, data, refetch, fetchMore, variables } = useQuery<feed>(
    FEED_QUERY,
    {
      variables: paginationVariables,
      notifyOnNetworkStatusChange: true,
    },
  );

  const initialLoad = loading && !data;

  const filter = (variables: any) =>
    fetchMore({
      variables: {
        ...variables,
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          items: fetchMoreResult.items || [],
        };
      },
    });

  return (
    <>
      <UploadProgress />
      <SelectContainer items={data ? data.items : []}>
        <Box d="flex" justifyContent="center">
          <Box width="90%" padding={50}>
            <Box
              height={80}
              d="flex"
              minWidth="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                d="flex"
                width="150px"
                justifyContent="space-between"
                alignItems="center"
              >
                <CreateFiles />
                <CreateLink />
                <NoteModal />
              </Box>
              <Filter filter={filter} variables={variables} />
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
                  // @ts-ignore
                  data.items.reduce((p, c) => {
                    const itemNode = <Item item={c} />;

                    // @ts-ignore
                    if (c.type === 'note' && !c.note.text) return p;

                    return [...p, <GridItem key={c.id}>{itemNode}</GridItem>];
                  }, [])}
                {/* <Grid.Row>
              <Loader active={!!(loading && data)} />
            </Grid.Row> */}
                <Waypoint
                  bottomOffset={-500}
                  onEnter={() => {
                    if (data && data.items && !loading) {
                      fetchMore({
                        variables: {
                          ...variables,
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
