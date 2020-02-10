import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Spinner,
} from '@chakra-ui/core';
import qs from 'query-string';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { FileDrawer } from '../components/FileDrawer';
import { useGetItem } from '../hooks/useGetItem';
import { usePrevious } from '../hooks/usePrevious';
import { NoteDrawer } from '../components/NoteDrawer';
import { LinkDrawer } from '../components/LinkDrawer';
import { useReturnToFeedFromItem } from '../hooks/useGoTo';
import { useMedia } from 'react-use';

export interface ItemDrawerProps {
  toggleFullScreen: () => any;
  isFullScreen: boolean;
  onClose: () => any;
}

export const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMedia('(max-width: 768px)');

  const match = useRouteMatch('/settings');

  const { isOpen, onOpen, onClose } = useDisclosure(!!match);

  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (!isOpen && previousIsOpen) {
      setTimeout(() => {
        console.log(location.pathname.replace('/settings', ''));
        history.push({
          pathname: location.pathname.replace('/settings', '') || '/',
          search: location.search,
        });
      }, 500);
    }
  }, [isOpen]);

  return (
    <Drawer
      placement="right"
      size="full"
      closeOnOverlayClick
      closeOnEsc
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent width={isMobile ? '100%' : '500px'}>
        <DrawerCloseButton bg="white" />

        <DrawerHeader
          borderBottomWidth="1px"
          display="flex"
          alignItems="center"
        >
          Settings
        </DrawerHeader>

        <DrawerBody d="flex" justifyContent="center" p="5px">
          No settings yet- coming soon!
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
