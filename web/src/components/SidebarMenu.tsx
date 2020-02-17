import React, { useEffect } from 'react';
import {
  Box,
  Image,
  Stack,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Divider,
  BoxProps,
  IconButton,
  Tooltip,
  Icon,
} from '@chakra-ui/core';
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// @ts-ignore
import resolveUrl from 'resolve-url';

import logo from '../images/logo.png';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';
import { NoteModal } from './NoteModal';
import { getQueryStringFromFilters } from '../util/helpers';
import { FaEllipsisH } from 'react-icons/fa';

export const SIDEBAR_WIDTH = '250px';

export const GET_SAVED_SEARCHES_QUERY = gql`
  query getSavedSearches {
    savedSearches {
      id
      name
      version

      filters {
        name
        operator
        value
        values
      }
    }
  }
`;

const DELETE_SAVED_SEARCH = gql`
  mutation deleteSavedSearch($id: String) {
    deleteSavedSearch(id: $id) {
      id
      name
    }
  }
`;

export interface LinkListItemProps extends BoxProps {
  filters: any[];
  pathname?: string;
  isActive?: boolean;
  rightNode?: any;
}

const LinkListItem = ({
  children,
  pathname,
  filters,
  isActive,
  rightNode,
  ...props
}: LinkListItemProps) => {
  const location = useLocation();

  return (
    <Flex width="100%">
      <Box
        width="100%"
        as={Link}
        // @ts-ignore
        to={{
          pathname: pathname || '/',
          search: getQueryStringFromFilters(filters, location),
        }}
        {...props}
      >
        <Button
          d="flex"
          justifyContent="flex-start"
          cursor="pointer"
          width="100%"
          textAlign="left"
          bg="none"
          color={isActive ? 'brand.purple.main' : undefined}
        >
          {children}
        </Button>
      </Box>

      {rightNode}
    </Flex>
  );
};

export const SidebarMenu = ({ sidebarState }: { sidebarState: any }) => {
  const { user, signOut } = useAuth();

  const { data, loading } = useQuery(GET_SAVED_SEARCHES_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const searchMatch = useRouteMatch('/search/:id');
  const match = useRouteMatch('*');

  const history = useHistory();
  const location = useLocation();

  const [deleteSavedSearch, { loading: isDeleting }] = useMutation(
    DELETE_SAVED_SEARCH,
    {
      refetchQueries: ['getSavedSearches'],
      onCompleted: data => {
        // @ts-ignore
        if (data?.deleteSavedSearch?.id === match?.params?.id) {
          history.push('/');
        }
      },
    },
  );

  useEffect(() => {
    if (searchMatch) {
      const activeSearch = (data?.savedSearches || []).find(
        // @ts-ignore
        savedSearch => searchMatch?.params?.id === savedSearch.id,
      );

      if (!activeSearch) history.push('/');
    }
  }, [searchMatch]);

  const createFileModal = useGlobalModal(ModalName.CREATE_FILES_MODAL);
  const createLinkModal = useGlobalModal(ModalName.CREATE_LINK_MODAL);

  return (
    <Box
      p="20px"
      height="100%"
      borderRight="1px solid lightgray"
      bg="gray.50"
      id="sidebar-container"
      zIndex={3}
    >
      <Flex height="100%" justifyContent="space-between" flexDirection="column">
        <Stack spacing="25px">
          <Flex
            cursor="pointer"
            as={Link}
            alignItems="center"
            // @ts-ignore
            to={{
              // @ts-ignore
              pathname: `${match.url}/settings`.replace('//', '/'),
              search: location.search,
            }}
          >
            <Image src={logo} size="30px" mr="7px" />
            <Text fontSize="sm" fontWeight="semibold" isTruncated>
              {user.email}
            </Text>
          </Flex>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                cursor="pointer"
                // @ts-ignore
                variant="outline"
                // @ts-ignore
                variantColor="white"
                bg="white"
                width="100%"
                onClick={(e: any) => {
                  e.stopPropagation();
                }}
              >
                Catalog...
              </MenuButton>
              <MenuList placement="bottom" zIndex={100} width="200px">
                <MenuItem onClick={createFileModal.openModal}>
                  New File
                </MenuItem>
                <MenuItem onClick={createLinkModal.openModal}>
                  New Link
                </MenuItem>
                <NoteModal>
                  {({ createNote, isCreating }) => (
                    <MenuItem onClick={() => createNote()}>
                      New Note {isCreating && <Spinner size="sm" />}
                    </MenuItem>
                  )}
                </NoteModal>
              </MenuList>
            </Menu>
          </Box>
          <Divider />
          <Box>
            <Stack spacing="5px">
              <Text color="gray.500">
                QUICK LINKS{' '}
                <Tooltip
                  zIndex={10}
                  aria-label="help"
                  label={'Use these links to quickly filter your feed.'}
                >
                  <Icon
                    cursor="pointer"
                    ml="5px"
                    name="info"
                    aria-label="info"
                  />
                </Tooltip>
              </Text>
              <LinkListItem filters={[]}>All</LinkListItem>
              <LinkListItem
                filters={[
                  { name: 'isFavorited', operator: 'equals', value: true },
                ]}
              >
                Favorites
              </LinkListItem>
              <LinkListItem
                filters={[{ name: 'type', operator: 'equals', value: 'file' }]}
              >
                Files
              </LinkListItem>
              <LinkListItem
                filters={[{ name: 'type', operator: 'equals', value: 'note' }]}
              >
                Notes
              </LinkListItem>
              <LinkListItem
                filters={[{ name: 'type', operator: 'equals', value: 'link' }]}
              >
                Links
              </LinkListItem>
              <LinkListItem
                filters={[
                  { name: 'type', operator: 'equals', value: 'googleContact' },
                ]}
              >
                Contacts
              </LinkListItem>
            </Stack>
          </Box>
          <Box>
            <Stack spacing="5px">
              <Text color="gray.500">
                SAVED SEARCHES ({data?.savedSearches?.length || 0})
                <Tooltip
                  zIndex={10}
                  aria-label="help"
                  label={
                    'To create a saved search, start by pressing the "Filter" button.'
                  }
                >
                  <Icon
                    cursor="pointer"
                    ml="5px"
                    name="info"
                    aria-label="info"
                  />
                </Tooltip>
              </Text>
              <Box maxHeight="500px" overflowY="auto">
                {!!data?.savedSearches?.length &&
                  (data?.savedSearches || []).map(
                    ({ id, name, filters }: any) => (
                      <LinkListItem
                        // @ts-ignore
                        isActive={match?.params?.id === id}
                        pathname={`/search/${id}`}
                        filters={filters.map(
                          ({ values, value, ...rest }: any) => ({
                            ...rest,
                            value: values || value,
                          }),
                        )}
                        rightNode={
                          <IconButton
                            variant="ghost"
                            icon="delete"
                            aria-label="delete"
                            isDisabled={isDeleting}
                            onClick={() => {
                              deleteSavedSearch({
                                variables: {
                                  id,
                                },
                              });
                            }}
                          />
                        }
                      >
                        {name || 'Untitled'}
                      </LinkListItem>
                    ),
                  )}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
