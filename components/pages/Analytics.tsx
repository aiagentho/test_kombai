'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  Paper,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { mockQuery } from '../../data/saasMockData';
import { formatNumber } from '../../utils/formatters';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const ChartPlaceholder = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  minHeight: 250,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Analytics() {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('7d');
  
  const { usageStats } = mockQuery;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  // Calculate summary stats
  const totalApiCalls = usageStats.reduce((sum, item) => sum + item.apiCalls, 0);
  const avgStorage = usageStats.reduce((sum, item) => sum + item.storage, 0) / usageStats.length;
  const avgBandwidth = usageStats.reduce((sum, item) => sum + item.bandwidth, 0) / usageStats.length;

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed insights into your API usage, performance metrics, and trends.
        </Typography>
      </Box>

      {/* Controls */}
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="7d">Last 7 days</MenuItem>
            <MenuItem value="30d">Last 30 days</MenuItem>
            <MenuItem value="90d">Last 90 days</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Tabs */}
      <Box>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Usage Overview" />
          <Tab label="API Performance" />
          <Tab label="Resource Consumption" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <StyledGrid>
            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                API Calls Trend
              </Typography>
              <ChartPlaceholder>
                <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
                  {formatNumber(totalApiCalls)}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Total API Calls
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  ↗ 12.5% increase this period
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Interactive chart visualization coming soon
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>

            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                Daily Usage Comparison
              </Typography>
              <ChartPlaceholder>
                <Typography variant="h3" color="secondary" fontWeight="bold" gutterBottom>
                  {formatNumber(Math.round(totalApiCalls / usageStats.length))}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Average Daily Calls
                </Typography>
                <Typography variant="body2" color="info.main" fontWeight="medium">
                  Consistent usage pattern
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Bar chart visualization coming soon
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>
          </StyledGrid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <StyledGrid>
            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                Response Time Trends
              </Typography>
              <ChartPlaceholder>
                <Typography variant="h3" color="info" fontWeight="bold" gutterBottom>
                  125ms
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Average Response Time
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  ↗ 5% improvement
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Performance metrics visualization
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>

            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                Error Rate Analysis
              </Typography>
              <ChartPlaceholder>
                <Typography variant="h3" color="error" fontWeight="bold" gutterBottom>
                  2.1%
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Current Error Rate
                </Typography>
                <Typography variant="body2" color="warning.main" fontWeight="medium">
                  Within acceptable range
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Error analysis visualization
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>
          </StyledGrid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <StyledGrid>
            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                Storage & Bandwidth Usage
              </Typography>
              <ChartPlaceholder>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary" fontWeight="bold">
                      {avgStorage.toFixed(1)} GB
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Storage
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning" fontWeight="bold">
                      {avgBandwidth.toFixed(1)} GB
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Bandwidth
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Resource usage trends visualization
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>

            <ChartContainer>
              <Typography variant="h6" gutterBottom>
                Resource Utilization
              </Typography>
              <ChartPlaceholder>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Box textAlign="center">
                    <Typography variant="h4" color="success" fontWeight="bold">
                      72%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CPU Usage
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info" fontWeight="bold">
                      54%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Memory Usage
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  System resource monitoring
                </Typography>
              </ChartPlaceholder>
            </ChartContainer>
          </StyledGrid>
        </TabPanel>
      </Box>
    </Stack>
  );
}