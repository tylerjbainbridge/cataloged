import React from 'react';
import styled from 'styled-components';

import { MainContent } from '../components/MainContent';

export const DashboardContainer = styled.div`
  height: 100vh;
`;

export const Dashboard = () => {
  return (
    <DashboardContainer>
      <MainContent />
    </DashboardContainer>
  );
};
