import React from 'react';
import styled from 'styled-components';

import { Feed } from '../components/Feed';

export const DashboardContainer = styled.div`
  height: 100vh;
`;

export const Dashboard = () => {
  return (
    <DashboardContainer>
      <Feed />
    </DashboardContainer>
  );
};
