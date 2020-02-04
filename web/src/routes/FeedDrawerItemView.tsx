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
import { useLocation, useHistory } from 'react-router-dom';
import { FileDrawer } from '../components/FileDrawer';
import { useGetItem } from '../hooks/useGetItem';
import { usePrevious } from '../hooks/usePrevious';
import { NoteDrawer } from '../components/NoteDrawer';
import { LinkDrawer } from '../components/LinkDrawer';
import { useReturnToFeedFromItem } from '../hooks/useGoTo';

export interface ItemDrawerProps {
  toggleFullScreen: () => any;
  isFullScreen: boolean;
  onClose: () => any;
}

export const FeedDrawerItemView = () => {
  const location = useLocation();
  const history = useHistory();

  const itemId = qs.parse(location.search)?.itemId;

  const fullScreen = useDisclosure(false);

  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const [returnToFeed] = useReturnToFeedFromItem();

  // @ts-ignore
  const { item, loading } = useGetItem(itemId);

  useEffect(() => {
    if (!loading && itemId) {
      if (item) onOpen();
      else returnToFeed();
    }
  }, [loading]);

  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (!isOpen && previousIsOpen) {
      setTimeout(() => {
        returnToFeed();
      }, 500);
    }
  }, [isOpen]);

  let drawerNode = null;

  const drawerProps = {
    item,
    onClose,
    toggleFullScreen: fullScreen.onToggle,
    isFullScreen: fullScreen.isOpen,
  };

  switch (item?.type) {
    case 'file':
      drawerNode = <FileDrawer {...drawerProps} />;
      break;

    case 'note':
      drawerNode = <NoteDrawer {...drawerProps} />;
      break;

    case 'link':
      drawerNode = <LinkDrawer {...drawerProps} />;
      break;
  }

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
      {!loading && item ? (
        drawerNode
      ) : (
        <DrawerContent
          maxHeight={fullScreen.isOpen ? '100vw' : undefined}
          width={fullScreen.isOpen ? '100vw' : '70%'}
        >
          <DrawerCloseButton bg="white" />

          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
          >
            Loading..
          </DrawerHeader>

          <DrawerBody d="flex" justifyContent="center" p="5px">
            <Spinner size="xl" />
          </DrawerBody>
        </DrawerContent>
      )}
    </Drawer>
  );
};
