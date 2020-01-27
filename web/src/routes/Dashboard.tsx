import React from 'react';
import styled from 'styled-components';

import { Feed } from '../components/Feed';
import { useAuth } from '../hooks/useAuth';
import { EnterInviteCode } from '../components/EnterInviteCode';

export const DashboardContainer = styled.div`
  height: 100vh;
`;

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user.isActive) {
    return <EnterInviteCode />;
  }

  return (
    <DashboardContainer>
      <Feed />
    </DashboardContainer>
  );
};
