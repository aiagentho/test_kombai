'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  }
}));

interface StatsWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  progressType?: 'linear' | 'circular' | 'none';
  progressValue?: number;
  maxValue?: number;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
}

export default function StatsWidget({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  progressType = 'none',
  progressValue,
  maxValue,
  trend
}: StatsWidgetProps) {
  const progressPercentage = progressValue && maxValue 
    ? Math.min((progressValue / maxValue) * 100, 100) 
    : 0;

  return (
    <StyledPaper>
      <Stack spacing={2} height="100%">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box sx={{ color: `${color}.main`, fontSize: 32 }}>
              {icon}
            </Box>
          )}
        </Stack>

        {/* Progress Indicators */}
        {progressType === 'linear' && progressValue !== undefined && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Usage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progressValue?.toLocaleString()} / {maxValue?.toLocaleString()}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              color={color}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'grey.800',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        )}

        {progressType === 'circular' && progressValue !== undefined && (
          <Box display="flex" justifyContent="center" alignItems="center" position="relative">
            <CircularProgress
              variant="determinate"
              value={progressPercentage}
              size={80}
              thickness={4}
              color={color}
              sx={{
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }}
            />
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" color={`${color}.main`} fontWeight="bold">
                {Math.round(progressPercentage)}%
              </Typography>
            </Box>
          </Box>
        )}

        {/* Trend */}
        {trend && (
          <Stack direction="row" alignItems="center" spacing={1} mt="auto">
            <Typography
              variant="body2"
              color={trend.isPositive ? 'success.main' : 'error.main'}
              fontWeight="medium"
            >
              {trend.isPositive ? '↗' : '↘'} {trend.isPositive ? '+' : ''}{trend.value}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trend.period}
            </Typography>
          </Stack>
        )}
      </Stack>
    </StyledPaper>
  );
}