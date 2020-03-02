import React, { useState, useEffect } from 'react';

import Sidebar from 'react-sidebar';
import { useDisclosure } from '@chakra-ui/core';
import qs from 'query-string';

import { Feed } from './Feed';
import { SidebarMenu, SIDEBAR_WIDTH } from './SidebarMenu';
import { CreateLink } from './CreateLink';
import { CreateFiles } from './CreateFiles';
import { FeedDrawerItemView } from '../routes/FeedDrawerItemView';
import { useLocation, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Settings } from '../routes/Settings';

const SIDEBAR_KEY = 'isSidebarOpen';

export interface ContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const SidebarContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

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
  const isViewingSettings = useRouteMatch('*/settings');

  return (
    <SidebarContext.Provider value={sidebarState}>
      <Sidebar
        sidebar={<SidebarMenu sidebarState={sidebarState} />}
        shadow={false}
        docked={sidebarState.isOpen}
        open={sidebarState.isOpen}
        // transitions={false}
        defaultSidebarWidth={250}
      >
        {/* {isViewingItem && !isViewingSettings && <FeedDrawerItemView />} */}
        {isViewingSettings && <Settings />}
        <CreateLink />
        <CreateFiles />
        <Feed sidebarState={sidebarState} />
      </Sidebar>
    </SidebarContext.Provider>
  );
};
