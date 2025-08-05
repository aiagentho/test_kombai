'use client';

import React from 'react';
import {
  Typography,
  Stack,
  Box,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import DashboardCard from '../dashboard/DashboardCard';
import StatsWidget from '../dashboard/StatsWidget';
import UsageChart from '../charts/UsageChart';
import { formatNumber, formatBytes } from '../../utils/formatters';
import { mockStore, mockQuery } from '../../data/saasMockData';

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Dashboard() {
  const { user, usage } = mockStore;
  const { usageStats } = mockQuery;

  const apiCallsProgress = (usage.currentMonth.apiCalls / usage.limits.apiCalls) * 100;
  const storageProgress = (usage.currentMonth.storage / usage.limits.storage) * 100;
  const bandwidthProgress = (usage.currentMonth.bandwidth / usage.limits.bandwidth) * 100;
  const usersProgress = (usage.currentMonth.users / usage.limits.users) * 100;

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {user.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your account activity and usage statistics.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <StyledGrid>
        <DashboardCard
          title="API Calls"
          value={formatNumber(usage.currentMonth.apiCalls)}
          subtitle={`of ${formatNumber(usage.limits.apiCalls)} limit`}
          icon={<DashboardIcon />}
          progress={apiCallsProgress}
          progressLabel="Monthly Usage"
          color="primary"
          trend={{ value: 12.5, isPositive: true }}
        />

        <DashboardCard
          title="Storage Used"
          value={`${usage.currentMonth.storage} GB`}
          subtitle={`of ${usage.limits.storage} GB limit`}
          icon={<BarChartIcon />}
          progress={storageProgress}
          progressLabel="Storage Usage"
          color="secondary"
          trend={{ value: 3.2, isPositive: true }}
        />

        <DashboardCard
          title="Bandwidth"
          value={`${usage.currentMonth.bandwidth} GB`}
          subtitle={`of ${usage.limits.bandwidth} GB limit`}
          icon={<AccountBalanceWalletIcon />}
          progress={bandwidthProgress}
          progressLabel="Bandwidth Usage"
          color="info"
          trend={{ value: 8.1, isPositive: false }}
        />

        <DashboardCard
          title="Active Users"
          value={usage.currentMonth.users}
          subtitle={`of ${usage.limits.users} limit`}
          icon={<PeopleIcon />}
          progress={usersProgress}
          progressLabel="User Limit"
          color="success"
          trend={{ value: 15.3, isPositive: true }}
        />
      </StyledGrid>

      {/* Usage Charts */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Usage Analytics
        </Typography>
        
        <Stack spacing={3}>
          <StyledGrid sx={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            [theme => theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(3, 1fr)',
            }
          }}>
            <ChartContainer>
              <UsageChart
                data={usageStats}
                metric="apiCalls"
                title="API Calls Over Time"
                height={250}
              />
            </ChartContainer>

            <ChartContainer>
              <UsageChart
                data={usageStats}
                metric="storage"
                title="Storage Usage Over Time"
                height={250}
              />
            </ChartContainer>

            <ChartContainer>
              <UsageChart
                data={usageStats}
                metric="bandwidth"
                title="Bandwidth Usage Over Time"
                height={250}
              />
            </ChartContainer>
          </StyledGrid>
        </Stack>
      </Box>

      {/* Additional Stats Widgets */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Account Overview
        </Typography>
        
        <StyledGrid sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          [theme => theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
          }
        }}>
          <StatsWidget
            title="Current Plan"
            value={user.plan}
            subtitle="Upgrade for more features"
            color="primary"
            progressType="none"
          />

          <StatsWidget
            title="Credits Remaining"
            value={user.credits.toLocaleString()}
            subtitle="Purchase more credits"
            color="secondary"
            progressType="circular"
            progressValue={user.credits}
            maxValue={5000}
          />

          <StatsWidget
            title="Account Status"
            value="Active"
            subtitle="All systems operational"
            color="success"
            progressType="none"
            trend={{
              value: 100,
              isPositive: true,
              period: "uptime"
            }}
          />
        </StyledGrid>
      </Box>
    </Stack>
  );
}