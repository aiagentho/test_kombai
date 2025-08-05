'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatNumber } from '../../utils/formatters';

const ChartPlaceholder = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

interface UsageData {
  date: string;
  apiCalls: number;
  storage: number;
  bandwidth: number;
}

interface UsageChartProps {
  data: UsageData[];
  metric: 'apiCalls' | 'storage' | 'bandwidth';
  title: string;
  height?: number;
}

export default function UsageChart({ data, metric, title, height = 300 }: UsageChartProps) {
  const getValueFormatter = (metric: string, value: number) => {
    switch (metric) {
      case 'apiCalls':
        return formatNumber(value);
      case 'storage':
        return `${value.toFixed(1)} GB`;
      case 'bandwidth':
        return `${value.toFixed(1)} GB`;
      default:
        return value.toString();
    }
  };

  const latestValue = data.length > 0 ? data[data.length - 1][metric] : 0;
  const previousValue = data.length > 1 ? data[data.length - 2][metric] : 0;
  const trend = previousValue > 0 ? ((latestValue - previousValue) / previousValue * 100) : 0;

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="text.primary">
        {title}
      </Typography>
      <ChartPlaceholder sx={{ height }}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          {getValueFormatter(metric, latestValue)}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Current {metric === 'apiCalls' ? 'API Calls' : metric === 'storage' ? 'Storage' : 'Bandwidth'}
        </Typography>
        <Typography 
          variant="body2" 
          color={trend >= 0 ? 'success.main' : 'error.main'}
          fontWeight="medium"
        >
          {trend >= 0 ? '↗' : '↘'} {Math.abs(trend).toFixed(1)}% from previous period
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          Chart visualization will be available with proper MUI X Charts setup
        </Typography>
      </ChartPlaceholder>
    </Box>
  );
}