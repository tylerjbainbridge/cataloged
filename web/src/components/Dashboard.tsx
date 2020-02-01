import React, { useState, useEffect } from 'react';

import Sidebar from 'react-sidebar';
import { useDisclosure, IconButton } from '@chakra-ui/core';
import qs from 'query-string';

import { Feed } from './Feed';
import { SidebarMenu, SIDEBAR_WIDTH } from './SidebarMenu';
import { CreateLink } from './CreateLink';
import { CreateFiles } from './CreateFiles';
import { FeedDrawerItemView } from '../routes/FeedDrawerItemView';
import { useLocation } from 'react-router-dom';
import { useMedia } from 'react-use';

const SIDEBAR_KEY = 'isSidebarOpen';

const getSidebarOpenState = (): boolean => {
  try {
    // @ts-ignore
    return Boolean(JSON.parse(localStorage.getItem(SIDEBAR_KEY)));
  } catch (e) {
    return true;
  }
};

export const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  });

  const isMobile = useMedia('(max-width: 768px)');

  const sidebarState = useDisclosure(getSidebarOpenState() && !isMobile);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, JSON.stringify(sidebarState.isOpen));
  }, [sidebarState.isOpen]);

  const location = useLocation();

  const isViewingItem = qs.parse(location.search)?.itemId;

  return (
    <Sidebar
      sidebar={<SidebarMenu sidebarState={sidebarState} />}
      shadow={false}
      docked={sidebarState.isOpen || !isMobile}
      open={sidebarState.isOpen || !isMobile}
      // transitions={false}
      defaultSidebarWidth={250}
    >
      {isViewingItem && <FeedDrawerItemView />}
      <Feed sidebarState={sidebarState} />
      <CreateLink />
      <CreateFiles />
    </Sidebar>
  );
};
