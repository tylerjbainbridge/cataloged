import React, { useContext } from 'react';
import { Box, Button, Icon } from '@chakra-ui/core';
import { useMedia } from 'react-use';
import { SidebarContext } from './Dashboard';

export interface TopNavBarProps {
  middleNode?: any;
  rightNode?: any;
}

export const TopNavBar = ({
  middleNode = null,
  rightNode = null,
}: TopNavBarProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const sidebarState = useContext(SidebarContext);

  const currentSidebarWidth =
    // @ts-ignore
    document.querySelector('#sidebar-container')?.offsetWidth;

  return (
    <Box
      height={80}
      d="flex"
      flex="1"
      width={
        sidebarState.isOpen || !isMobile
          ? `calc(100% - ${currentSidebarWidth || 0}px)`
          : '100%'
      }
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      zIndex={1}
      padding="20px"
      bg="rgb(255, 255, 255, 0.7)"
    >
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        width={isMobile ? '100%' : '80%'}
      >
        {isMobile ? (
          <Button cursor="pointer" onClick={sidebarState.onToggle}>
            <Icon
              name={sidebarState.isOpen ? 'arrow-left' : 'arrow-right'}
              aria-label={
                sidebarState.isOpen ? 'close sidebar' : 'open sidebar'
              }
              width="15px"
            />
          </Button>
        ) : (
          <Box />
        )}
        {sidebarState.isOpen && isMobile ? null : (
          <>
            {middleNode || <Box />}
            {rightNode || <Box />}
          </>
        )}
      </Box>
    </Box>
  );
};
