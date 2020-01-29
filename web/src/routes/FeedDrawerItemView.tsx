import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@chakra-ui/core';
import {
  useLocation,
  useHistory,
  RouteChildrenProps,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { FileDrawer } from '../components/FileDrawer';
import { useGetItem } from '../hooks/useGetItem';
import { usePrevious } from '../hooks/usePrevious';
import { NoteDrawer } from '../components/NoteDrawer';
import { LinkDrawer } from '../components/LinkDrawer';
import { useGoToPath } from '../hooks/useGoToPath';

export interface ItemDrawerProps {
  toggleFullScreen: () => any;
  isFullScreen: boolean;
  onClose: () => any;
}

export const FeedDrawerItemView = () => {
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const match = useRouteMatch({ path: '/item/:id' });

  const history = useHistory();

  const fullScreen = useDisclosure(false);

  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const [goTo] = useGoToPath();

  // @ts-ignore
  const { item, loading } = useGetItem(match.params?.id);

  useEffect(() => {
    if (!loading && item) {
      onOpen();
    }
  }, [loading]);

  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (!isOpen && previousIsOpen) {
      setTimeout(() => {
        goTo('/');
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
