import React from 'react';
import styled from 'styled-components';

import { Dashboard } from '../components/Dashboard';
import { useAuth } from '../hooks/useAuth';
import { EnterInviteCode } from '../components/EnterInviteCode';

export const Main = () => {
  const { user } = useAuth();

  if (!user.isActive) {
    return <EnterInviteCode />;
  }

  return <Dashboard />;
};
