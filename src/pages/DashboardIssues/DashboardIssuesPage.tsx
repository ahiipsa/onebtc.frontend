import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardIssuesTable } from './components/DashboardIssuesTable';

type Props = {};

export const DashboardIssuesPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Title align="center">Issue Requests</Title>
          <Divider colorful fullwidth />
          <DashboardIssuesTable />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardIssuesPage.displayName = 'DashboardIssuesPage';
