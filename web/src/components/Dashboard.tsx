import React from 'react';

import Sidebar from 'react-sidebar';
import { useDisclosure } from '@chakra-ui/core';
import qs from 'query-string';

import { Feed } from './Feed';
import { SidebarMenu } from './SidebarMenu';
import { CreateLink } from './CreateLink';
import { CreateFiles } from './CreateFiles';
import { FeedDrawerItemView } from '../routes/FeedDrawerItemView';
import { useRouteMatch, useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure(true);

  const location = useLocation();

  const isViewingItem = qs.parse(location.search)?.itemId;

  return (
    <Sidebar
      sidebar={<SidebarMenu />}
      shadow={false}
      docked={isOpen}
      open={isOpen}
      transitions={!isOpen}
    >
      {isViewingItem && <FeedDrawerItemView />}
      <Feed />
      <CreateLink />
      <CreateFiles />
    </Sidebar>
  );
};
