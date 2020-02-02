import React from 'react';
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
  List,
  ListItem,
  BoxProps,
  IconButton,
} from '@chakra-ui/core';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import logo from '../images/logo.png';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';
import { NoteModal } from './NoteModal';
import { getQueryStringFromFilters } from '../util/helpers';

export const SIDEBAR_WIDTH = '250px';

export interface LinkListItemProps extends BoxProps {
  filters: any[];
}

const LinkListItem = ({ children, filters, ...props }: LinkListItemProps) => {
  const location = useLocation();

  return (
    <Button
      d="flex"
      justifyContent="flex-start"
      as={Link}
      // @ts-ignore
      to={{
        pathname: '/',
        search: getQueryStringFromFilters(filters, location),
      }}
      cursor="pointer"
      width="100%"
      textAlign="left"
      bg="none"
      {...props}
    >
      {children}
    </Button>
  );
};

export const SidebarMenu = ({ sidebarState }: { sidebarState: any }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

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
          <Flex alignItems="center">
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
            <Stack spacing="10px">
              <Text color="gray.500">QUICK LINKS</Text>
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
            </Stack>
          </Box>
        </Stack>
        <Button
          d="flex"
          alignItems="center"
          cursor="pointer"
          p="3px"
          m={0}
          onClick={() => {
            window.localStorage.removeItem('cataloged-cache');
            signOut();
          }}
        >
          Sign out
        </Button>
      </Flex>
    </Box>
  );
};
