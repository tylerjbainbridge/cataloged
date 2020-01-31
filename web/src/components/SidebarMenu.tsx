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
} from '@chakra-ui/core';

import logo from '../images/logo.png';
import { useAuth } from '../hooks/useAuth';
import { useGlobalModal, ModalName } from './GlobalModal';
import { NoteModal } from './NoteModal';

export const SidebarMenu = () => {
  const { user, signOut } = useAuth();

  const createFileModal = useGlobalModal(ModalName.CREATE_FILES_MODAL);
  const createLinkModal = useGlobalModal(ModalName.CREATE_LINK_MODAL);

  return (
    <Box
      width="250px"
      p="20px"
      height="100%"
      borderRight="1px solid lightgray"
      zIndex={1}
      bg="gray.50"
    >
      <Flex height="100%" justifyContent="space-between" flexDirection="column">
        <Stack spacing="25px">
          <Flex alignItems="center">
            <Image src={logo} size="30px" mr="7px" />
            <Text fontSize="md" fontWeight="semibold" isTruncated>
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
