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
import { Link, LinkProps } from 'react-router-dom';

import logo from '../images/logo.png';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';
import { NoteModal } from './NoteModal';

export const SIDEBAR_WIDTH = '250px';

export interface LinkListItemProps extends BoxProps {
  to: LinkProps['to'];
}

const LinkListItem = ({ children, to, ...props }: LinkListItemProps) => (
  <Button
    d="flex"
    justifyContent="flex-start"
    as={Link}
    // @ts-ignore
    to={to}
    cursor="pointer"
    width="100%"
    textAlign="left"
    bg="none"
    {...props}
  >
    {children}
  </Button>
);

export const SidebarMenu = ({ sidebarState }: { sidebarState: any }) => {
  const { user, signOut } = useAuth();

  const createFileModal = useGlobalModal(ModalName.CREATE_FILES_MODAL);
  const createLinkModal = useGlobalModal(ModalName.CREATE_LINK_MODAL);

  return (
    <Box
      p="20px"
      height="100%"
      borderRight="1px solid lightgray"
      zIndex={1}
      bg="gray.50"
      id="sidebar-container"
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
              <LinkListItem to="/files">Files</LinkListItem>
              <LinkListItem to="/notes">Notes</LinkListItem>
              <LinkListItem to="/links">Links</LinkListItem>
              <LinkListItem to="/favorites">Favorites</LinkListItem>
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
